define([],
    function () {
        var httpStatusMsg = {
            'NO_BLANK': 'Not allow blank',
            'FORMAT_ERROR': 'Invalid format',
            'NOT_URL': 'Not a Git url',
            'INPUT_INVALID': 'Input is invalid',
            'PROJECT_TITLE_ERROR': 'Project title error',
            'PROJECT_URL_ERROR': 'Url error',
            'STAGINGSERVERS_ERROR': 'StagingServers error',
            'PRODUCTIONSERVERS_ERROR': 'ProductionServers error',
            'NO_PUBLISH_AUTH': 'You no publish auth',
            'NO_OPERATE_AUTH': 'You no operate auth',
            'REPO_ALREADY_EXISTS': 'existing'
        };

        return httpStatusMsg;
    }
);
