<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($id) 
    {
        $user = \App\Models\User::find($id);
        return view('user', [
            'user'=>$user
        ]);
    }

    public function edit($id) 
    {
        $profile = \App\Models\Profile::where('user_id', $id)->first();

        return view('user_edit', [
            'id'=>$id,
            'profile'=>$profile
        ]);
    }

    public function update(Request $req, $id) 
    {
        $this->validate($req, [
            'country' => 'required', 
            'body' => 'required', 
            'image' => 'required', 
        ]);

        $profile = \App\Models\Profile::updateOrCreate(
            ['user_id' => $id],
            [
                'country' => $req->country, 
                'description' => $req->description,
                'image' => $req->image,
                'user_id' => $id
            ]
        );

        return redirect('/');
    }
}
