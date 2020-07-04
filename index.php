<?php

use Kirby\Http\Url;
use Kirby\Toolkit\Str;

Kirby::plugin('gearsdigital/enhanced-toolbar-link-dialog', [
    'api'          => [
        'models'      => [
            // a camelCased model name results in Kirby\Exception\NotFoundException
            'simplepagemodel' => [
                'type'=> null,
                'fields' => [
                    'id'    => function ($page) {
                        return $page->id();
                    },
                    'title' => function ($page) {
                        $query = option('gearsdigital.enhanced-toolbar-link-dialog.link.title', '{{ page.title }}');
                        return Str::template($query, [
                            'page' => $page,
                            'site' => site(),
                            'kirby' => kirby(),
                        ]);
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
            'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Link Target',
            'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Specify where to open the linked document.'
        ],
        'de' => [
            'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interner Link',
            'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externer Link',
            'gearsdigital.enhanced-toolbar-link-dialog.empty'    => 'Keine Seiten gefunden.',
            'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Link Ziel',
            'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Gibt an, wo das verknüpfte Dokument geöffnet werden soll.',
        ],
    ],
]);
