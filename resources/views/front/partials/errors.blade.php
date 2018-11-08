@if(isset($errorBag) ? $errors->$errorBag->any() : $errors->any())
    <div class="bg-red text-white rounded p-4">
        <ul class="leading-loose">
            @foreach(isset($errorBag) ? $errors->$errorBag->all() : $errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
