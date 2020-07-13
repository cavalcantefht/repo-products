<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Error;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::all();
            return response()->json($users, 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao buscar usuários, tente novamente."
            ]);
        }
    }


    public function store(Request $request)
    {
        $data = $request->only(["name", "email", "password"]);

        if (!$data["name"] || !$data["email"] || !$data["password"]) {
            return response()->json([
                "error" => "Favor preencher todos os campos corretamente."
            ], 400);
        }

        if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                "error" => "E-mail inválido."
            ], 400);
        }

        try {
            $user = User::where('email', '=', trim($data["email"]))->get();

            if (count($user) > 0) {
                return response()->json([
                    "error" => "E-mail já cadastrado"
                ], 400);
            }

            $user = new User();

            $user->name = trim($data["name"]);
            $user->email = trim($data["email"]);
            $user->password = Hash::make(trim($data["password"]));

            $user->save();

            return response()->json([
                "message" => "Usuário cadastrado com sucesso"
            ], 200);
        } catch (Error $error) {
            return response()->json([
                "error" => "Erro ao cadastrar usuário, tente novamente."
            ], 400);
        }
    }
}
