class UserAlreadyExistsError(Exception):
    pass


class UserNotExistsError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


errors = {
    "UserAlreadyExistsError": {
        "message": "Movie with given name already exists",
        "status": 400
    },
    "UserNotExistsError": {
        "message": "User with given id doesn't exists",
        "status": 400
    },
    "UnauthorizedError": {
        "message": "Invalid username or password",
        "status": 401
    }


}
