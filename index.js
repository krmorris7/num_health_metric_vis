export default function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/num_health_metric_vis/num_health_metric_vis'
            ]
        }
    });
};
