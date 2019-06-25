import { expect } from 'chai';
import TemplateEngine from '../../src/util/TemplateEngine';

describe(`TemplateEngine`, function() {
  const mockTemplate = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>{{ siteTitle }}</title>
        <meta name="description" content="Simplest Blog in Nodejs">
        <meta name="author" content="Guillermo Pages">
        <meta name="nested-child" content="{{ nested.child }}">
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      </head>

      <body>
        <h1>{{ siteTitle }}</h1>
        <ul>
          {{posts as post
          <li><a href="/{{ post.attributes.slug }}">{{ post.attributes.title }}</a><p>{{ post.body }}</p></li>
          posts}}
        </ul>
      </body>
    </html>
    `;

  const mockData = {
    siteTitle: 'Guillermo.at',
    title: 'Home',
    nested: { child: 'this is nested' },
    posts: [
      {
        attributes: { title: 'My BlogPost', slug: 'my-blog-post' },
        body: '<p>Ain&#39;t it amazing?</p>\n<h2 id="code">Code</h2>\n<p>Look I can eve',
        frontmatter: 'title: My BlogPost'
      },
      {
        attributes: { title: 'My Other Blog Post', slug: 'my-other-blog-post' },
        body: '<p>Quite amazing indeed!</p>\n<h2 id="code">Code</h2>\n<p>Look I can eve',
        frontmatter: 'title: My Other Blog Post'
      },
    ],
  };

  describe(`getRefList(template)`, function() {
    it('should return a list of all references in the template', function() {
      expect(TemplateEngine.getRefList(mockTemplate)).to.be.an('array');
    });
    it('should return a list of all unique simple references in the template', function() {
      expect(TemplateEngine.getRefList(mockTemplate).length).to.be.equal(5);
    });
  });

  describe(`getNestedPath(dotNotation)`, function() {
    it('should return a an array', function() {
      expect(TemplateEngine.getNestedPath('this.is.an')).to.be.an('array');
    });
    it('should return an array with one more elements than dots in the string', function() {
      expect(TemplateEngine.getNestedPath('this.is.an').length).to.be.equal(3);
    });
    it('should return ["this", "is", "an"]', function() {
      expect(TemplateEngine.getNestedPath('this.is.an')).to.be.eql(["this", "is", "an"]);
    });
  });

  describe(`getReferencedValue(data, ref)`, function() {
    it('should access nested.child as data["nested"]["child"]', function() {
      expect(TemplateEngine.getReferencedValue(mockData, 'nested.child')).to.be.equal(mockData['nested']['child']);
    });
  });

  describe(`replaceRef(template, data, ref)`, function() {
    it('should replace all such references', function() {
      expect(TemplateEngine.replaceRef(mockTemplate, mockData, 'nested.child'))
        .to.be.equal(mockTemplate.replace('{{ nested.child }}', mockData['nested']['child']));
    });
  });
});
