@if(isset($errorBag) ? $errors->$errorBag->any() : $errors->any())
    <div class="notification is-danger">
        <div class="content">
            <ol>
                @foreach(isset($errorBag) ? $errors->$errorBag->all() : $errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ol>
        </div>
    </div>
@endif
