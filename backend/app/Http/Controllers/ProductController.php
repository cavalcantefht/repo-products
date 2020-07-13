<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use App\Product;
use Error;

class ProductController extends Controller
{
    function index(Request $request)
    {
        try {


            if ($request->category) {
                $products = Product::where('category_id', $request->category)
                    ->with('category')
                    ->get();
            } else {
                $products = Product::with('category')->get();
            }
            return response()
                ->json($products, 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao buscar produtos, tente novamente."
            ]);
        }
    }

    function show(Request $request)
    {
        $product = Product::find($request->product);
        $product["category"] = $product
            ->category()
            ->first();

        return response()
            ->json($product, 200);
    }

    function store(Request $request)
    {
        $data = $request
            ->only(
                [
                    "name",
                    "category_id",
                    "price"
                ]
            );

        if (!$data["name"] || !$data["category_id"] || !$data["price"]) {
            return response()->json([
                "error" => "Favor preencher todos os campos"
            ], 400);
        }

        if (!Category::find($data["category_id"])) {
            return response()->json([
                "error" => "Categoria inexistente."
            ]);
        }

        try {
            $product = new Product();

            $product->name = trim($data['name']);
            $product->category_id = trim($data['category_id']);
            $product->price = trim($data["price"]);

            $product->save();

            return response()
                ->json([
                    "message" => "Produto cadastrado com sucesso."
                ], 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao gravar produto, tente novamente.",
            ], 400);
        }
    }

    function update(Request $request)
    {
        $data = $request->only(
            [
                "name",
                "category_id",
                "price"
            ]
        );

        if (!$data["name"] || !$data["category_id"] || !$data["price"]) {
            return response()->json([
                "error" => "Favor preencher todos os campos"
            ], 400);
        }
        try {

            if (!Category::find($data["category_id"])) {
                return response()->json([
                    "error" => "Categoria inexistente."
                ]);
            }

            $product = Product::find($request->product);

            if (!$product) {
                return response()->json([
                    "error" => "Produto inexistente."
                ]);
            }
            $product->name = trim($data["name"]);
            $product->category_id = trim($data["category_id"]);
            $product->price = trim($data["price"]);
            $product->save();

            return response()
                ->json(
                    ["message" => "Produto alterado com sucesso."],
                    200
                );
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao editar produto, tente novamente."
            ], 400);
        }
    }

    function destroy(Request $request)
    {
        try {
            $product = Product::find($request->product);

            if ($product) {
                $product->delete();
                return response()
                    ->json(
                        ["message" => "Produto deletado com sucesso."],
                        200
                    );
            } else {
                return response()
                    ->json(
                        ["error" => "Produto não encontrado."],
                        400
                    );
            }
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao deletar produto, tente novamente."
            ]);
        }
    }
}
