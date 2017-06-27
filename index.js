export default function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/numberless_health_metric_vis/numberless_health_metric_vis'
            ]
        }
    });
};
