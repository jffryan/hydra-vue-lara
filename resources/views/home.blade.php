<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ URL::asset('favicon.png') }}">
        <title>Hydra</title>
        @vite('resources/css/app.css')
    </head>
    <body class="antialiased bg-hydra-cinder-800 text-white">
        <div id="app"></div>
        @vite('resources/js/app.js')
    </body>
</html>
