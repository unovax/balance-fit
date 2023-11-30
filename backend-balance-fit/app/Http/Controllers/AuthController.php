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
        // Validar la solicitud de registro
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        // Crear usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user = Auth::user();
        $user->token = $user->createToken('Personal Access Token')->plainTextToken;
        return response(['user' => $user], 200);
    }

    public function login(Request $request)
    {
        // Validar la solicitud de inicio de sesión
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        // Intentar iniciar sesión
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Usuario autenticado, generar token de acceso
            $user = Auth::user();
            $user->token = $user->createToken('Personal Access Token')->plainTextToken;
            return response(['user' => $user], 200);
        } else {
            // Credenciales incorrectas
            return response(['errors' => ['Credenciales incorrectas']], 401);
        }
    }

    public function logout(Request $request){
        Auth::user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
