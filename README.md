## Getting Started

### Get Project Running
1. Clone the project from github.

2. Install dependencies.
```bash
cd user_registration
npm install
```

### Running the application.
```bash
npm run server
```

### Registration POST api
http://HOST/api/user/register

### Registration api sample payload
**payload to be sent within body as raw json**
{
    "email" : EMAIL,
    "password" : PASSWORD,
    "name" : NAME
}
