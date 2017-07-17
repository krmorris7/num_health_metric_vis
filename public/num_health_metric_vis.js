import 'plugins/num_health_metric_vis/num_health_metric_vis.less';
import 'plugins/num_health_metric_vis/num_health_metric_vis_controller';
import VisVisTypeProvider from 'ui/vis/vis_type';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import numHealthMetricVisTemplate from 'plugins/num_health_metric_vis/num_health_metric_vis.html';
import numHealthMetricVisParamsTemplate from 'plugins/num_health_metric_vis/num_health_metric_vis_params.html';
import visTypesRegistry from 'ui/registry/vis_types';
import image from './images/icon-number.svg';

// Register the provider with the visTypes registry
visTypesRegistry.register(NumHealthMetricVisProvider);

function NumHealthMetricVisProvider(Private) {
  const VisType = Private(VisVisTypeProvider)
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  // Options tab setup
  return new TemplateVisType({
    name: "num-health-metric",
    title: "Health Metric w/ Numbers",
    image,
    description: 'Displays a color based on the health status of the metric.',
    category: VisType.CATEGORY.DATA,
    template: numHealthMetricVisTemplate,
    params: {
      defaults: {
        handleNoResults: true,
        fontSize: 60,
        fontColor: 'white',
        link: "kibana:5601",
        invertScale: false,
        redThreshold: 4,
        yellowThreshold: 3,
        greenThreshold: 2,
        redColor: "#E51010",
        yellowColor: "#FF8000",
        greenColor: "#22A222",
        greyColor: "#767676",
      },
      editor: numHealthMetricVisParamsTemplate
    },
    // Data tab setup
    implementsRenderComplete: true,
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        max: 1,
        aggFilter: ['!derivative', '!geo_centroid'],
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
      }
    ])
  });
}

// export the provider so that the visType can be required with Private()
export default NumHealthMetricVisProvider;
