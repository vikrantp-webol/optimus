@if(isset($errorBag) ? $errors->$errorBag->any() : $errors->any())
    <div class="bg-red-500 text-white rounded mb-4 p-6">
        <ul class="list-reset">
            @foreach(isset($errorBag) ? $errors->$errorBag->all() : $errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
