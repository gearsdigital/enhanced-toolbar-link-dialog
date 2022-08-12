# Enhanced Toolbar Link Dialog

![Kirby](https://img.shields.io/badge/Kirby-3.6.*-brightgreen.svg)
![Kirby](https://img.shields.io/badge/Kirby-3.7.*-brightgreen.svg)
![Version](https://img.shields.io/github/v/release/gearsdigital/enhanced-toolbar-link-dialog?label=Version&color=4CC61E&logo=github)
![E2E](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/workflows/E2E/badge.svg)
![Downloads](https://img.shields.io/packagist/dt/gearsdigital/enhanced-toolbar-link-dialog?label=Downloads)
![PHP 8.0](https://img.shields.io/badge/php-8.*-brightgreen.svg?color=8892BF&logo=php)

This plugin extends the default link dialog with a search functionality. This makes it possible, to create links to _existing_ or _external_ pages.

<video src="https://user-images.githubusercontent.com/965069/184151351-ec468d93-d4bd-4fc1-827d-22348abbc368.mp4" controls="controls" muted="muted"></video>

## Configuration

These are all available configuration options and their default values.

| Option      | Description                                                                                                                       | Type      | Default            |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------|-----------|--------------------|
| `title`     | Format the page title of the result list using [Kirby Query Language](https://getkirby.com/docs/guide/blueprints/query-language). | `string`  | `{{ page.title }}` |
| `filter`    | Filter the result list. Learn how to use [`filterBy`](https://getkirby.com/docs/reference/objects/toolkit/collection/filter-by).  | `array`   | `null`             |
| `sort`      | Sort the result list. Learn how to use [`sortBy`](https://getkirby.com/docs/reference/objects/toolkit/collection/sort-by).        | `array`   | `null`             |
| `qualified` | Prefix every link with your current [Site-Url](https://getkirby.com/docs/reference/objects/cms/site/url).                         | `boolean` | `false`            |

### Usage

```php
// site/config/config.php
return [
  "gearsdigital.enhanced-toolbar-link-dialog" => [
    "title" => "{{ page.title }}",
    "filter" => null,
    "sort" => null,
    "qualified" => false
  ]
];
```

## Installation

### Composer (recommended)

```
composer require gearsdigital/enhanced-toolbar-link-dialog
```

### Download

Download the [latest version](https://github.com/gearsdigital/enhanced-toolbar-link-dialog/releases/latest), copy all files to `/site/plugins/enhanced-toolbar-link-dialog`.

### Git submodule

```
git submodule add https://github.com/gearsdigital/enhanced-toolbar-link-dialog.git site/plugins/enhanced-toolbar-link-dialog
```

## FAQ

<details>
<summary><b>Can I use this plugin with Kirby Blocks?</b></summary>
<p>Since version 3.0.0, <a href="https://getkirby.com/docs/reference/panel/fields/blocks">Blocks</a> are supported,
and it works with default textareas as well.</p>
</details>

<details>
<summary><b>Can I link to different sites?</b></summary>
<p>Yes, absolutely. Just write (or paste) the URL into the Link field.</p>
</details>

<details>
<summary><b>Can I create anchor only links?</b></summary>
<p>It is possible to have anchor only links if you want to jump to a specific part of the same page you're currently editing - just leave the Link-Field empty and fill the Anchor-Field.</p>
</details>

<details>
<summary><b>Can I customize the result list page title?</b></summary>
<p>Yes, you can use the option <code>title</code> to build a title that fit your needs by using <a href="https://getkirby.com/docs/guide/blueprints/query-language">Kirby Query Language</a>.</p>
<p>Within a query you have access to a <code>page</code>, <code>site</code> and <code>kirby</code> object.</p>
<p>By setting <code>"title"=> "{{page.title}} [{{page.parent.title}}]"</code> the title will be shown as <code>Mountains [Photography]</code>.</p>
</details>

<details>
<summary><b>Can I show only pages that match some specific criteria?</b></summary>
<p>For sure! By setting <code>"filter"=> ['status', 'listed']</code> only listed pages are shown. You study the <a href="https://getkirby.com/docs/cookbook/content/filtering">
Filtering compendium</a> to learn more about filtering collections in Kirby.</p>
</details>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
