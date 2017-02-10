import {closeCourse, deleteCourse, showSettings, deleteTask, publishTask, unpublishTask} from './help';
import sortable from 'common/sortable';
import 'store';
const COURSE_FUNCTION_REMASK = 'COURSE-FUNCTION-REMASK'; //课程改版功能提醒

if ($('#sortable-list').length) {
  sortable({
    element: '#sortable-list'
  });
}


if(!store.get(COURSE_FUNCTION_REMASK)) {
  store.set(COURSE_FUNCTION_REMASK,true);
  $('#course-function-modal').modal('show');
}

closeCourse();
deleteCourse(store);
deleteTask();
publishTask();
unpublishTask();
showSettings();
