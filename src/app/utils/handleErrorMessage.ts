import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleErrorMessage = (error: HttpErrorResponse) => {
  if (error.status === HttpStatusCode.InternalServerError) {
    return throwError('Server Connection Error');
  }
  if (error.status === HttpStatusCode.NotFound) {
    return throwError('Not found');
  }
  if (error.status === HttpStatusCode.Unauthorized) {
    return throwError('You do not have authorized');
  }
  return throwError(error.message);
};
