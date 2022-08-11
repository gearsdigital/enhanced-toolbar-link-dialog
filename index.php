<?php

Kirby::plugin('gearsdigital/enhanced-toolbar-link-dialog', [
    'translations' => require_once __DIR__.DS.'translations.php',
    'hooks' => require_once __DIR__.DS.'hooks.php',
    'api' => require_once __DIR__.DS.'routes.php',
]);
