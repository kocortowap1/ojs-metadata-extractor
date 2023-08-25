
const HTMLParser = require('node-html-parser');

const ojsHTMLParser = function (html){
    const root = HTMLParser.parse(html)
    const judul = root.querySelector('meta[name="citation_title"]')?.getAttribute('content')
    const authors = root.querySelectorAll('meta[name="citation_author"]')?.map(m => m.getAttribute('content')).join(', ')
    const nama_jurnal = root.querySelector('meta[name="citation_journal_title"]')?.getAttribute('content')
    const volume = root.querySelector('meta[name="citation_volume"]')?.getAttribute('content')
    const nomor = root.querySelector('meta[name="citation_issue"]')?.getAttribute('content')
    const pages = root.querySelector('meta[name="DC.Identifier.pageNumber"]')?.getAttribute('content')
    const firstPage = root.querySelector('meta[name="citation_firstpage"]')?.getAttribute('content')
    const lastPage = root.querySelector('meta[name="citation_lastpage"]')?.getAttribute('content') || ''
    const issn = root.querySelector('meta[name="citation_issn"]')?.getAttribute('content')
    const doi = root.querySelector('meta[name="citation_doi"]')?.getAttribute('content')
    const url_abstract = root.querySelector('meta[name="citation_abstract_html_url"]')?.getAttribute('content')
    const url_doc = root.querySelector('meta[name="citation_pdf_url"]')?.getAttribute('content')
    const date = root.querySelector('meta[name="citation_date"]')?.getAttribute('content')

    let mydata = { 
        citation_title: judul, 
        citation_authors: authors, 
        citation_journal_title: nama_jurnal, 
        citation_volume: volume, 
        citation_issue: nomor, 
        citation_pages: pages ? pages : `${firstPage}-${lastPage}`, 
        citation_issn: issn, 
        citation_doi: doi ? `${doi}` : '', 
        citation_url: url_abstract, 
        citation_pdf_url: url_doc, 
        citation_date: date 
    }
    return mydata
}

const sintaHTMLParser = function(html){
    const root = HTMLParser.parse(html)

}

module.exports = {
    ojsHTMLParser,sintaHTMLParser
}