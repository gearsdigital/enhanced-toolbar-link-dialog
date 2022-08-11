<?php

return [
    'system.loadPlugins:after' => function () {
        $translations = option('gearsdigital.enhanced-toolbar-link-dialog.translations', []);
        if (count($translations) > 0) {
            kirby()->extend(['translations' => $translations], kirby()->plugin('gearsdigital/enhanced-toolbar-link-dialog'));
        }
    },
];
