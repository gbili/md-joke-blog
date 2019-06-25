class TemplateEngine {
  static hydrate(viewTemplate, viewData) {
    viewTemplate = TemplateEngine.replaceArray(viewTemplate, viewData);
    return TemplateEngine.replace(viewTemplate, viewData);
  }

  static getRefList(viewTemplate) {
    const surroundingLen = '{{ '.length;
    const unsurroundedRefs = viewTemplate.match(new RegExp('{{ \\w+(?:\\.\\w+)* }}', 'gs')).map(surroundedRef => {
      return surroundedRef.substring(surroundingLen, surroundedRef.length-surroundingLen)
    });
    return (unsurroundedRefs && [...new Set(unsurroundedRefs)]) || [];
  }

  static getNestedPath(dotNotation) {
    return dotNotation.split('.');
  }

  static getReferencedValue(data, ref) {
    const nestedPath = TemplateEngine.getNestedPath(ref);
    let value = { ...data };
    for (let paramName of nestedPath) {
      if (!value.hasOwnProperty(paramName)) {
        throw new TypeError('Trying to access a non existing param: ' + ref);
      }
      value = value[paramName];
    }
    return value;
  }

  static replaceRef(viewTemplate, viewData, ref) {
    return viewTemplate.replace(
      new RegExp(`{{ ${ref} }}`, 'g'),
      TemplateEngine.getReferencedValue(viewData, ref)
    );
  }

  static replace(viewTemplate, viewData) {
    const references = TemplateEngine.getRefList(viewTemplate);
    for (let ref of references) {
      viewTemplate = TemplateEngine.replaceRef(viewTemplate, viewData, ref)
    }
    return viewTemplate;
  }

  static replaceArray(viewTemplate, viewData) {
    let r = new RegExp('{{(\\w+(?:\\.\\w+)*) as (\\w+)(.+)\\1}}', 'sg');
    let match = r.exec(viewTemplate);
    if (match) {
      let tpl = match[0];
      let outerRef = match[1];
      let subDatas = TemplateEngine.getReferencedValue(viewData, outerRef)
      let innerRef = match[2];
      let subTpl = match[3];
      let subTplWithoutInnerRefPrefix = subTpl.replace(new RegExp(`{{ ${innerRef}\\.`, 'g'), '{{ ');
      let hydratedViewPart = subDatas.map(subData => {
        return TemplateEngine.replace(subTplWithoutInnerRefPrefix, subData);
      }).join('');
      viewTemplate = viewTemplate.replace(
        new RegExp(tpl, 'g'),
        hydratedViewPart
      );
    }
    return viewTemplate;
  }

}

export default TemplateEngine;
