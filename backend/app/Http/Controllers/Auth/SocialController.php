<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use Socialite;
Use App\Models\User;

class SocialController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect()->getTargetUrl();
    }

    public function Callback($provider){
        $userSocial  =   Socialite::driver($provider)->stateless()->user();
        $user  =   User::where('email', $userSocial->email)->first();

        if($user){
            $user -> update([
                'remember_token' => $userSocial->token
            ]);
        }else{
            $user = User::create([
                'name'          => $userSocial->getName(),
                'email'         => $userSocial->getEmail(),
                'remember_token' => $userSocial->token,
                'avatar'        => $userSocial->getAvatar(),
                'provider_id'   => $userSocial->getId(),
                'provider'      => $provider,
            ]);
        }

        Auth::login($user);

        return [
            'user'  => $user,
            'access_token' => $user->createToken('user')->plainTextToken,
        ];
    }
}
