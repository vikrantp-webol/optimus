<?php

namespace App\Http\Controllers\Back\Api;

use App\Http\Controllers\Back\Controller;
use App\Http\Resources\AdminUserResource;
use App\Models\AdminUser;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class AdminUsersController extends Controller
{
    /**
     * Display a paginated list of admin users.
     *
     * @return ResourceCollection
     */
    public function index()
    {
        /** @var Collection $users */
        $users = AdminUser::orderBy('name')->get();

        return AdminUserResource::collection($users);
    }

    /**
     * Create a new admin user.
     *
     * @param Request $request
     * @return AdminUserResource
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        $user = new AdminUser(
            Arr::except($data, 'password')
        );

        $user->password = bcrypt($data['password']);

        $user->save();

        return new AdminUserResource($user);
    }

    /**
     * Display the specified admin user.
     *
     * @param int $id
     * @return AdminUserResource
     */
    public function show($id)
    {
        /** @var AdminUser */
        $user = AdminUser::findOrFail($id);

        return new AdminUserResource($user);
    }

    /**
     * Update the specified admin user.
     *
     * @param Request $request
     * @param int $id
     * @return AdminUserResource
     */
    public function update(Request $request, $id)
    {
        /** @var AdminUser $user */
        $user = AdminUser::findOrFail($id);

        $data = $request->validate([
            'name' => 'filled|string|max:255',
            'email' => 'filled|email|max:255',
            'username' => 'filled|string|max:255',
            'password' => 'filled|string|min:8',
        ]);

        $user->fill(
            Arr::except($data, 'password')
        );

        if (! empty($data['password'])) {
            $user->password = bcrypt($data['password']);
        }

        $user->save();

        return new AdminUserResource($user);
    }

    /**
     * Display the specified admin user.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        AdminUser::findOrFail($id)->delete();

        return response()->noContent();
    }
}
