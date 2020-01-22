<?php
Kirby::plugin('gearsdigital/enhanced-toolbar-link-dialog', [
    'api'          => [
        'routes' => [
            [
                'pattern' => 'enhanced-toolbar-link-dialog/pages',
                'method'  => 'get',
                'action'  => function () {
                    $page = get('page');
                    $query = get('search', '*');

                    if (empty($query)) {
                        $query = '*';
                    }

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
            'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Internal Link',
            'gearsdigital.enhanced-toolbar-link-dialog.external' => 'External Link',
        ],
        'de' => [
            'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interner Link',
            'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externer Link',
        ],
    ],
]);
