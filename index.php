<?php

Kirby::plugin('gearsdigital/enhanced-toolbar-link-dialog', [
    'translations' => require_once __DIR__.'/translations.php',
    'hooks' => require_once __DIR__.'/hooks.php',
    'api' => require_once __DIR__.'/routes.php',
]);
