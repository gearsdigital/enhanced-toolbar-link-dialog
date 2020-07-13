<?php

use Kirby\Http\Url;
use Kirby\Toolkit\Str;

$translations = [
    'en' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Internal Link',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'External Link',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'No pages found',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Link Target',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Specify where to open the linked document.',
    ],
    'de' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interner Link',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externer Link',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Keine Seiten gefunden.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Link Ziel',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Gibt an, wo das verknüpfte Dokument geöffnet werden soll.',
    ],
    'cs' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interní odkaz',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externí odkaz',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Nebyly nalezeny žádné stránky.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Cíl odkazu',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Můžete upřesnit, kam se má odkaz otevřít.',
    ],
];

// This quite hacky but enables us to pass options down to VUE.
// We're programmatically extending translations by adding a "hidden" key.
// This key can than be comsumed within the Vue part of the plugin using the $t helper.
// @Fixes: #27
function tabOrderOptionInterceptor(&$translations)
{
    $order = option('gearsdigital.enhanced-toolbar-link-dialog.tab.order', "0");

    foreach ($translations as $k => $v) {
        $translations[$k] += ["gearsdigital.enhanced-toolbar-link-dialog.tab.order" => $order];
    }

    return $translations;
}

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
                'type'=> null,
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
    'translations' => tabOrderOptionInterceptor($translations),
]);
