<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Food;
class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $foods=Food::all();
        return response()->json([
            'foods' => $foods,
            'error' => false
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'barcode' => 'required',
            'name' => 'required',
            'description' => 'required',
            'calories' => 'required',
            'carbohydrates' => 'required',
            'proteins' => 'required',
            'fats' => 'required',
        ]);
        try {
            $food = new Food();
            if($request->hasFile('img')){
                $file = $request->file('img');
                $name = $request->barcode . '.' . $file->getClientOriginalExtension();
                $path = $request->file('img')->storeAs('foods', $name, 'public');
                $food->img = env("APP_URL") . '/storage/' . $path;
            }
            $food->barcode = $request->barcode;
            $food->name = $request->name;
            $food->description = $request->description;
            $food->calories = $request->calories;
            $food->carbohydrates = $request->carbohydrates;
            $food->proteins = $request->proteins;
            $food->fats = $request->fats;
            $food->save();

            return response()->json([
                'food' => $food,
                'message' => 'Alimento creado correctamente',
                'error' => false
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'error' => true
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //return OpenFoodFacts\OpenFoodFacts::barcode($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'barcode' => 'required',
            'name' => 'required',
            'description' => 'required',
            'calories' => 'required',
            'carbohydrates' => 'required',
            'proteins' => 'required',
            'fats' => 'required',
        ]);
        try {
            $food = Food::find($id);
            if($request->hasFile('img')){
                $file = $request->file('img');
                $name = $request->barcode . '.' . $file->getClientOriginalExtension();
                $path = $request->file('img')->storeAs('foods', $name, 'public');
                $food->img = env("APP_URL") . '/storage/' . $path;
            }
            $food->barcode = $request->barcode;
            $food->name = $request->name;
            $food->description = $request->description;
            $food->calories = $request->calories;
            $food->carbohydrates = $request->carbohydrates;
            $food->proteins = $request->proteins;
            $food->fats = $request->fats;
            $food->save();

            return response()->json([
                'food' => $food,
                'message' => 'Alimento actualizado correctamente',
                'error' => false
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'error' => true
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Food::destroy($id);
            return response()->json([
                'message' => 'Alimento eliminado correctamente',
                'error' => false
            ], 200);
            //code...
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'error' => true
            ], 500);
        }
    }
}
