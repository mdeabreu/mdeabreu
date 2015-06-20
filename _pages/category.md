---
layout: page
title: Category Archive
permalink: /category/
---

{% capture site_categories %}{% for cat in site.categories %}{{ cat | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign categories = site_categories | split:',' | sort %}

{% if categories.size > 0 %}
  <ul>
    {% for c in categories %}
      <li>{% categorylink c %}{{ c | capitalize }}{% endcategorylink %}</li>
    {% endfor %}
  </ul>
{% else %}
  <p>It looks like there are no posts or pages in any categories.</p>
{% endif %}