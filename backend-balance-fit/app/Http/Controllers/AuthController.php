<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Crear usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->token = $user->createToken('Personal Access Token')->plainTextToken;

        return response([
            'user' => $user,
            'error' => false,
            'message' => 'Registro de usuario correcto'
        ], 200);

    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Intentar iniciar sesión
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Usuario autenticado, generar token de acceso
            $user = Auth::user();
            $user->token = $user->createToken('Personal Access Token')->plainTextToken;

            return response([
                'user' => $user,
                'error' => false,
                'message' => 'Inicio de sesion correcto'
            ], 200);

        } else {
            // Credenciales incorrectas
            return response([
                'error' => true,
                'message' => 'Credenciales incorrectas'
            ], 401);
        }
    }

    public function logout(Request $request){
        Auth::user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
