from lxml.html.defs import safe_attrs
from lxml_html_clean import Cleaner


def clean_html(html: str) -> str:
    return Cleaner(
        safe_attrs=safe_attrs | set(["style"]),
    ).clean_html(html)
