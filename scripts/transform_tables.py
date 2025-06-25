# transform_tables.py
import re
from bs4 import BeautifulSoup

def transform_html_tables_to_markdown(html_content):
    """
    Converts all HTML tables in the given string to Markdown table syntax.
    Returns the modified text with tables replaced.
    """
    soup = BeautifulSoup(html_content, 'html.parser')

    for table in soup.find_all('table'): # find all <table> elements
        # Build a list of rows
        markdown_table = []
        rows = table.find_all('tr')

        for i, row in enumerate(rows): # loop over each row 
            cells = row.find_all(['th', 'td'])
            row_text = [cell.get_text(strip=True) for cell in cells]
            markdown_table.append(row_text)

        if not markdown_table: # convert the rows into Markdown lines
            continue

        # Check if first row is a header (based on <th> usage)
        has_header = any(th.name == 'th' for th in rows[0].find_all(['th', 'td']))

        markdown_lines = []
        if has_header:
            header_row = markdown_table[0]
            # Header line
            markdown_lines.append('| ' + ' | '.join(header_row) + ' |')
            # Separator
            markdown_lines.append('| ' + ' | '.join(['---'] * len(header_row)) + ' |')
            # Remaining rows
            for row_data in markdown_table[1:]:
                markdown_lines.append('| ' + ' | '.join(row_data) + ' |')
        else:
            # No header: treat everything as normal rows
            for row_data in markdown_table:
                markdown_lines.append('| ' + ' | '.join(row_data) + ' |')

        # Replace the entire <table> with the Markdown text
        md_table_string = '\n'.join(markdown_lines)
        table.replace_with(md_table_string)

    return str(soup)