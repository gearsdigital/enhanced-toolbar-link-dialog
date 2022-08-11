<?php

use Kirby\Cms\Search;
use Kirby\Toolkit\Str;

function pageUrl(Kirby\Cms\Page $page, bool $qualified)
{
    if ($qualified) {
        return $page->url();
    }

    return parse_url($page->url(), PHP_URL_PATH);
}

function pageTitle(Kirby\Cms\Page $page): string
{
    $query = option('gearsdigital.enhanced-toolbar-link-dialog.title', '{{ page.title }}');

    return Str::template($query, [
        'page' => $page,
        'site' => site(),
        'kirby' => kirby(),
    ]);
}

function customPageData(Kirby\Cms\Page $page): array
{
    return [
        'id' => $page->id(),
        'text' => pageTitle($page),
        'link' => pageUrl($page, option('gearsdigital.enhanced-toolbar-link-dialog.qualified', false)),
        'info' => $page->slug(),
        'image' => $page->panel()->image(),
    ];
}

function pagination(array $array, int $page, int $pageSize): array
{
    $arrayChunks = array_chunk($array, $pageSize);

    return $arrayChunks[$page - 1] ?? [];
}

return [
    'routes' => [
        [
            'pattern' => 'enhanced-toolbar-link-dialog/pages',
            'action' => function () {
                $query = get('q', '*');
                $page = get('page', 1);
                // this option isn't documented because I don't want to break the layout if someone decided to show
                // 30 pages per page but I'll keep it just in case
                $limit = option('gearsdigital.enhanced-toolbar-link-dialog.limit', 5);
                $pages = Search::pages($query);

                if ($sortBy = option('gearsdigital.enhanced-toolbar-link-dialog.sort')) {
                    $pages = $pages->sortBy(...$sortBy);
                }

                if ($filter = option('gearsdigital.enhanced-toolbar-link-dialog.filter')) {
                    $pages = $pages->filterBy(...$filter);
                }

                foreach ($pages as $contentPage) {
                    $results[] = customPageData($contentPage);
                }

                return [
                    "data" => pagination($results ?? [], $page, $limit),
                    "pagination" => [
                        "total" => sizeof($results ?? []),
                        "page" => $page,
                        "limit" => $limit,
                    ],
                ];
            },
        ],
        [
            'pattern' => 'enhanced-toolbar-link-dialog/page',
            'action' => function () {
                $id = get('id');
                $page = page($id);

                if ($page) {
                    return customPageData($page);
                }

                return null;
            },
        ],
    ],
];
