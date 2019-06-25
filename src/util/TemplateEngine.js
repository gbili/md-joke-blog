class TemplateEngine {
  static hydrate(viewTemplate, viewData) {
    viewTemplate = TemplateEngine.replaceSimple(viewTemplate, viewData);
    return TemplateEngine.replaceArray(viewTemplate, viewData);
  }

  static replaceSimple(viewTemplate, viewData) {
    for (let param in viewData) {
      if (typeof viewData[param] === 'object') {
        for (let paramPropName in viewData[param]) {
          viewTemplate = viewTemplate.replace(
            new RegExp(`{{ ${param}.${paramPorpName} }}`, 'g'),
            viewData[param][paramPropName]
          );
        }
      } else {
        viewTemplate = viewTemplate.replace(
          new RegExp(`{{ ${param} }}`, 'g'),
          viewData[param]
        );
      }
    }
    return viewTemplate;
  }

  static replaceArray(viewTemplate, viewData) {
    for (let param in viewData) {
      let s = `{{${param} as (\\w+)(.+)${param}}}`;
      let r = new RegExp(s, 'sg');
      let match = r.exec(viewTemplate);
      if (match) {
        let tpl = match[0];
        let dataPointName = match[1];
        let subTpl = match[2];
        let hydratedViewPart = viewData[param].map(dataPoint => {
          return TemplateEngine.replaceSimple(subTpl, { [dataPointName]: dataPoint });
        }).join('');
        viewTemplate = viewTemplate.replace(
          new RegExp(tpl, 'g'),
          hydratedViewPart
        );
      }
    }
    return viewTemplate;
  }

}

export default TemplateEngine;
