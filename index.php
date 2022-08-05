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
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Blank',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'Self',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Top',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'Parent',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Title',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Anchor (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0',
        'gearsdigital.enhanced-toolbar-link-dialog.advanced' => 'Show advanced settings',
    ],
    'de' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interner Link',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externer Link',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Keine Seiten gefunden.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Link Ziel',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Gibt an, wo das verknüpfte Dokument geöffnet werden soll.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Blank',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'Self',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Top',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'Parent',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Titel',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Anker (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0',
        'gearsdigital.enhanced-toolbar-link-dialog.advanced' => 'Erweiterte Linkeinstellungen',
    ],
    'cs' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interní odkaz',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externí odkaz',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Nebyly nalezeny žádné stránky.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Cíl odkazu',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Můžete upřesnit, kam se má odkaz otevřít.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Blank',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'Self',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Top',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'Parent',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Title',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Anchor (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0',
        'gearsdigital.enhanced-toolbar-link-dialog.advanced' => 'Show advanced settings',
    ],
    'fr' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Lien interne',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Lien externe',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Aucune page trouvée',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Cible du lien',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Définir l’ouverture du lien.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Blank',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'Self',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Top',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'Parent',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Titre',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Ancre (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0',
        'gearsdigital.enhanced-toolbar-link-dialog.advanced' => 'Voir les paramètres avancés',
    ],
    'nl' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Interne Link',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Externe Link',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Geen pagina\'s gevonden',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Link Doel',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Geef aan waar het gekoppelde document moet worden geopend.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Blank',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'Self',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Top',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'Parent',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Titel',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Anker (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0',
        'gearsdigital.enhanced-toolbar-link-dialog.advanced' => 'Show advanced settings',
    ],
    'is' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Tengill innan vefsvæðis',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Tengill utan vefsvæðis',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Engar síður fundust',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Rammi (Gluggi)',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Tilgreindu hvernig þú vilt að nýr tengill opnist.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Nýr gluggi',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'Í sama glugga',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Efst',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'Í foreldri',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Titill',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Bensli (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0'
    ],    
    'da' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Internt link',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Eksternt link',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Ingen sider blev fundet',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Linkmål',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Angiv, hvor det linkede dokument skal åbnes.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Nyt vindue',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'I samme vindue',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Top',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'I forældrevinduet',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Titel',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Anker (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0'        
    ],
    'se' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Intern länk',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Ekstern länk',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Inga sidor hittades',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Länkmål',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Ange var det länkade dokumentet ska öppnas.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Nytt fönster',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'Samma fönster',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Topp',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'I föräldrafönstret',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Titel',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Ankere (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0'       
    ],
    'no' => [
        'gearsdigital.enhanced-toolbar-link-dialog.internal' => 'Intern lenke',
        'gearsdigital.enhanced-toolbar-link-dialog.external' => 'Ekstern lenke',
        'gearsdigital.enhanced-toolbar-link-dialog.empty' => 'Ingen sider funnet',
        'gearsdigital.enhanced-toolbar-link-dialog.target.title' => 'Linkmål',
        'gearsdigital.enhanced-toolbar-link-dialog.target.help' => 'Angi hvor det koblede dokumentet skal åpnes.',
        'gearsdigital.enhanced-toolbar-link-dialog.target.blank' => 'Nytt vindu',
        'gearsdigital.enhanced-toolbar-link-dialog.target.self' => 'I samme vindu',
        'gearsdigital.enhanced-toolbar-link-dialog.target.top' => 'Topp',
        'gearsdigital.enhanced-toolbar-link-dialog.target.parent' => 'I foreldrevinduet',
        'gearsdigital.enhanced-toolbar-link-dialog.title.title' => 'Tittel',
        'gearsdigital.enhanced-toolbar-link-dialog.anchor.title' => 'Anker (#)',
        'gearsdigital.enhanced-toolbar-link-dialog.tab.order' => '0'        
    ],    
];

Kirby::plugin('gearsdigital/enhanced-toolbar-link-dialog', [
    'hooks' => [
        'system.loadPlugins:after' => function () {
            $translations = option('gearsdigital.enhanced-toolbar-link-dialog.translations', []);
            if (count($translations) > 0) {
                kirby()->extend(['translations' => $translations], kirby()->plugin('gearsdigital/enhanced-toolbar-link-dialog'));
            }
        },
    ],
    'api' => [
        'models' => [
            'simplepagemodel' => [
                'type' => 'Page',
                'fields' => [
                    'id' => function ($page) {
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
                    'slug' => function ($page) {
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
        'routes' => [
            [
                'pattern' => 'enhanced-toolbar-link-dialog/pages',
                'method' => 'get',
                'action' => function () {
                    $page = get('page');
                    $query = get('search');

                    if (empty($query)) {
                        $query = '*';
                    }

                    $search = site()->search($query, 'title');
                    $filter = option('gearsdigital.enhanced-toolbar-link-dialog.search.filter');

                    if ($filter) {
                        $search->filterBy(...$filter);
                    }

                    $pagedCollection = $search->paginate([
                        'page' => $page,
                        'limit' => option('gearsdigital.enhanced-toolbar-link-dialog.search.pageSize', 5),
                    ]);

                    return $this->collection('simplepagecollection', $pagedCollection);
                },
            ],
        ],
    ],
    'translations' => $translations,
]);
