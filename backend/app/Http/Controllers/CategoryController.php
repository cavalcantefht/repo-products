<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use Error;

class CategoryController extends Controller
{
    function index()
    {
        try {
            $categories = Category::all();
            return response()->json($categories, 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao buscar categorias, tente novamente."
            ], 400);
        }
    }

    function show(Request $request)
    {
        try {
            $category = Category::find($request->category);
            $category["products"] = $category->product()->get();
            return response()->json($category, 200);
        } catch (Error $err) {
            return response()->json([
                "error" => "Erro ao buscar categoria, tente novamente mais tarde."
            ], 400);
        }
    }

    function store(Request $request)
    {
        $data = $request->only(["name"]);

        try {

            $category = Category::where('name', '=', trim($data["name"]))->get();

            if (count($category) > 0) {
                return response()->json([
                    "error" => "Categoria já cadastrada."
                ], 400);
            }

            $category = new Category();

            $category->name = trim($data['name']);

            $category->save();

            return response()->json($category, 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao gravar categoria, tente novamente mais tarde."
            ], 400);
        }
    }

    function update(Request $request)
    {
        $data = $request->only('name');

        try {
            $category = Category::find($request->category);

            if (!$category) {
                return response()
                    ->json(['message' => 'Erro ao buscar categoria'], 400);
            }

            $category->name = $data['name'];

            $category->save();

            return response()->json($category, 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao editar categoria, tente novamente mais tarde."
            ], 400);
        }
    }

    function destroy(Request $request)
    {
        try {
            $category = Category::find($request->category);

            if (!$category) {
                return response()
                    ->json(['message' => 'Categoria não encontrada'], 400);
            }

            $category->delete();

            return response()
                ->json(['message' => 'Categoria deletada com sucesso.'], 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao tentar excluir categoria, tente novamente mais tarde."
            ], 400);
        }
    }
}
