<?php

use Kirby\Http\Url;

Kirby::plugin('gearsdigital/enhanced-toolbar-link-dialog', [
    'api'          => [
        'models'      => [
            // a camelCased model name results in Kirby\Exception\NotFoundException
            'simplepagemodel' => [
                'fields' => [
                    'id'    => function ($page) {
                        return $page->id();
                    },
                    'title' => function ($page) {
                        return $page->title()->value();
                    },
                    'slug'  => function ($page) {
                        return URL::makeAbsolute($page->parent().DS.$page->slug());
                    },
                ],
            ],
        ],
        'collections' => [
            'simplepagecollection' => [
                'model' => 'simplepagemodel',
                'type'  => 'Kirby\Toolkit\Collection',
            ],
        ],
        'routes'      => [
            [
                'pattern' => 'enhanced-toolbar-link-dialog/pages',
                'method'  => 'get',
                'action'  => function () {
                    $page = get('page');
                    $query = get('search');

                    if (empty($query)) {
                        $query = '*';
                    }

                    $pagedCollection = site()->search($query, 'title')->paginate([
                        'page'  => $page,
                        'limit' => 10,
                    ]);

                    return $this->collection('simplepagecollection', $pagedCollection);
                },
            ],
        ],
    ],
    'translations' => [
        'en' => [
            'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Internal Link',
            'gearsdigital.enhanced-toolbar-link-dialog.external' => 'External Link',
            'gearsdigital.enhanced-toolbar-link-dialog.empty'    => 'No pages found',
        ],
        'de' => [
            'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interner Link',
            'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externer Link',
            'gearsdigital.enhanced-toolbar-link-dialog.empty'    => 'Keine Seiten gefunden.',
        ],
    ],
]);
