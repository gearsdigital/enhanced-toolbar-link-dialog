<?php

function mergeTranslations($array1, $array2)
{
    foreach ($array2 as $key => $value) {
        if (isset($array1[$key]) && is_array($value)) {
            $array1[$key] = mergeTranslations($array1[$key], $value);
        } else {
            $array1[$key] = $value;
        }
    }

    return $array1;
}

// This method adds plugin options as translations for the current panel language, allowing these
// options to be accessed in the VUE part of the plugin using the $t()-helper.
// This is a workaround and might cause issues ¯\_(ツ)_/¯
function enhanceTranslationsWithInternalOptions($translations)
{
    $targetKey = "gearsdigital.enhanced-toolbar-link-dialog.target-field";
    $anchorKey = "gearsdigital.enhanced-toolbar-link-dialog.anchor-field";
    $language = kirby()->panelLanguage();

    $enhanced[$language] = [
        $targetKey => option($targetKey),
        $anchorKey => option($anchorKey),
    ];

    return mergeTranslations($translations, $enhanced);
}

return [
    'system.loadPlugins:after' => function () {
        $translations = option('gearsdigital.enhanced-toolbar-link-dialog.translations', []);
        $translations = enhanceTranslationsWithInternalOptions($translations);

        if (count($translations) > 0) {
            kirby()->extend(['translations' => $translations], kirby()->plugin('gearsdigital/enhanced-toolbar-link-dialog'));
        }
    },
];
