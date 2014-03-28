/**
 * @file 任务处理页面 controller
 *
 * @author  miaojian(miaojian@wandoujia.com)
 * @date 2014/03/17
 */

define([ '_', 'moment'], function (_, moment) {
    var ProjectsTaskController = function ($scope, $location, $route, projectsDao, $routeParams, confirm) {

        $scope.tasks = [];

        // 根据返回的status，添加状态class
        $scope.statusClass = [ 'info', 'warning', 'default', 'danger', 'warning', 'success' ];

        $scope.statusText = {
            0 : 'created',
            1 : 'executing',
            2 : 'pause',
            3 : 'fail',
            4 : 'executing',
            5 : 'success'
        };

        //$scope.totalItems = 64;
        //$scope.currentPage = 4;

        // get project list
        projectsDao.project.getTasks({ id: $routeParams.id }).$promise.then(function (tasks) {

            // TODO filter
            _.forEach(tasks, function (item, name) {
                filterTask(item);
            });

            $scope.tasks = tasks;
        });

        // 过滤处理item数据
        function filterTask(item) {

            var duration = item.endingTimestamp - item.timestamp;

            item.duration = moment.duration(duration).asMilliseconds();

            item.timestamp = moment(parseInt(item.timestamp, 10)).format('YYYY-MM-DD hh:mm:ss');

        }

        // public handler
        $scope.publish = function (id) {

            //$scope['disabled-hookItem' + id] = true;
            projectsDao.hook.run({ id: id }).$promise.then(function (result) {
                var taskId = result.id;

                projectsDao.task.get({ id: taskId }).$promise.then(function (task) {

                    filterTask(task);
                    $scope.tasks.unshift(task);
                });
            });
        };

        $scope.goHookList = function () {
            $location.path('/projects/' + $routeParams.title + '/hooks');
        };

        $scope.goEdit = function () {
            $location.path('/projects/' + $routeParams.title);
        };

        // 删除当前项目
        $scope.delete = function () {

            confirm('Are you sure to delete this Project?').then(function () {

                projectsDao.project.delete({title:  $routeParams.title}).$promise.then(function () {

                    //删除成功后返回到list页面
                    $location.path('/projects');
                    
                });
            });
        };

        // listen status
        $scope.$on('eventcenter.server', function (data) {

            if (data.channel === 'taskStatusChange') {
                
                _.forEach($scope.tasks, function (task, name, tasks) {

                    if (task.id === data.body.id) {
                        
                        task.status = data.body.status;
                    }
                });
            }
        });
    };

    ProjectsTaskController.$inject = [ '$scope', '$location', '$route', 'projectsDao', '$routeParams', 'confirm' ];

    return ProjectsTaskController;
});