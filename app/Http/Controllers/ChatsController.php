<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('chat');
    }

    public function fetchMessages()
    {
        return Message::with('user')->get();
    }

    public function sendMessage(Request $request)
    {
        $user = auth()->user();
        $sendMessage = new Message();
        $sendMessage->user_id = $user->id;
        $sendMessage->message = $request->message;
        $sendMessage->save();

        broadcast(new MessageSent($user, $sendMessage))->toOthers();
        return ['status' => 'Message Sent!'];
    }
}
