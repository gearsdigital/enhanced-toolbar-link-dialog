# Enhanced Toolbar Link Dialog - A plugin to handle internal links

What the heck is *Enhanced Toolbar Link Dialog* about? Glad you asked! *Enhanced Toolbar Link Dialog* is a perfect helper if you…

1. Can't remember all the pesky and way to long Page URLs,
2. Want to build up or optimize your internal link structure for SEO without any effort
3. Looking for a convenient way to deal with internal links

*Enhanced Toolbar Link Dialog* is a Kirby 3 plugin which makes it easy to add internal or external references to your content by extending the default link dialog of Kirby's [textarea fields](https://getkirby.com/docs/reference/panel/fields/textarea#toolbar).

## Panel view

![panel-view](https://user-images.githubusercontent.com/965069/72836833-a97fc600-3c8d-11ea-958f-76af3d919ec4.gif)

## How to use

After you've installed *Enhanced Toolbar Link Dialog* successfully, open a page of your choice and click the link toolbar button. Make sure the toolbar or the link button [isn't switched off](https://getkirby.com/docs/reference/panel/fields/textarea#toolbar__disabling-the-toolbar).

After you clicked the link toolbar button, a modal window gets openend which consists two tabs:

The "*External Link*" tab is exactly what you've had before.

Where it gets interesting is the "*Internal Link*" tab. Within this tab you can:

- search for specific pages (by page title)
- paginate through all existing pages (published/unpublished)
- specify where to open the linked document in [KirbyText](https://getkirby.com/docs/reference/text/kirbytags)

As soon as you have found your page, you can select and insert it into your document.

## Installation

### Composer

```
composer require gearsdigital/enhanced-toolbar-link-dialog
```

### Git submodule

```
git submodule add https://github.com/gearsdigital/enhanced-toolbar-link-dialog.git site/plugins/enhanced-toolbar-link-dialog
```

### Download

[Download](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/releases/latest) and copy this repository to `/site/plugins/enhanced-toolbar-link-dialog`.

## Configuration

The list item text is created using the [Kirby Query Language](https://getkirby.com/docs/guide/blueprints/query-language) and therefore customizable. It is totally up to you, how the page will appear to your users. You have access to `$page`, `site` and `kirby`.

The default is `{{ page.title }}`.

In order to change the default add `gearsdigital.enhanced-toolbar-link-dialog.link.title` to your `site/config.php`.

### Example
```php
// site/config.php
return [
    'gearsdigital.enhanced-toolbar-link-dialog.link.title' => '### {{ page.title }} ###',
];
```

This will wrap the text in `###` => (`### In the jungle of Sumatra ###`)

## Available translations

- German
- English

> Pull requests with additonal translations are very much appreciated!

## License

MIT
