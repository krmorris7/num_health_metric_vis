import 'plugins/health_metric_vis/health_metric_vis.less';
import 'plugins/health_metric_vis/health_metric_vis_controller';
import VisVisTypeProvider from 'ui/vis/vis_type';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import healthMetricVisTemplate from 'plugins/health_metric_vis/health_metric_vis.html';
import healthMetricVisParamsTemplate from 'plugins/health_metric_vis/health_metric_vis_params.html';
import visTypesRegistry from 'ui/registry/vis_types';
import image from './images/icon-number.svg';

// Register the provider with the visTypes registry
visTypesRegistry.register(HealthMetricVisProvider);

function HealthMetricVisProvider(Private) {
  const VisType = Private(VisVisTypeProvider)
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  // Options tab setup
  return new TemplateVisType({
    name: 'status-check',
    title: 'Status Check',
    image,
    description: 'Displays a color based on the health status of the metric.',
    category: VisType.CATEGORY.DATA,
    template: healthMetricVisTemplate,
    params: {
      defaults: {
        handleNoResults: true,
        fontSize: 60,
        fontColor: 'black',
        invertScale: false,
        redThreshold: 4,
        yellowThreshold: 3,
       // greenThreshold: 2,
        redColor: "#E51010",
        yellowColor: "#FF8000",
        greenColor: "#22A222",
       // greyColor: "#8E928E",
      },
      editor: healthMetricVisParamsTemplate
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
export default HealthMetricVisProvider;
