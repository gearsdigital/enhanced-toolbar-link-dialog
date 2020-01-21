<?php
Kirby::plugin('gearsdigital/kirby-better-link', [
    'api'          => [
        'routes' => [
            [
                'pattern' => 'better-link/pages',
                'method'  => 'get',
                'action'  => function () {
                    $page = get('page');
                    $query = get('search', '*');

                    return site()->search($query, 'title')->paginate([
                        'page'  => $page,
                        'limit' => 10,
                    ]);
                },
            ],
        ],
    ],
    'translations' => [
        'en' => [
            'gearsdigital.kirbybetterlink.internal' => 'Internal Link',
            'gearsdigital.kirbybetterlink.external' => 'External Link',
        ],
        'de' => [
            'gearsdigital.kirbybetterlink.internal' => 'Interner Link',
            'gearsdigital.kirbybetterlink.external' => 'Externer Link',
        ],
    ],
]);
