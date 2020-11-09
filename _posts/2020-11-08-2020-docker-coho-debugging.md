---
layout: post
title: Setting up Docker, Debugging City of Hope website
categories: [general]
tags: [disco-tray-studio, city-of-hope]
fullview: true
comments: true
---
### Docker 

In order to increase interoperability and to create a unified build environment, I decided to implement Docker for the Hendrix Assessment project 🐳.

At first glance, I thought this would be a much easier task than it turned out to be. In order to reduce the complexity with build commands, I needed to simplify the ASP.NET project from three seperate solutions into one solution. 

This involved creating a new solution and moving various files around, as well as generating a new .csproj file using commands and through manual editing.

Next, I needed to Dockerize the project. 

At first, I began with a Dockerfile similar to the CityOfHope Dockerfile, but because of issues I tried various other configurations (argh networking!) and landed back at the CoHo file.

Finally, I needed to create an environment file and create a script to run the Docker project. 


### CoHo

When testing out the City Of Hope website, I got strange errors when clicking "Show Yearly Reports":

```
2020-11-05T22:02:56.834519285Z �[41m�[30mfail�[39m�[22m�[49m: Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware[1]
2020-11-05T22:02:56.834578486Z An unhandled exception has occurred while executing the request.
2020-11-05T22:02:56.834584386Z System.InvalidOperationException: Sequence contains no elements
2020-11-05T22:02:56.836087407Z at System.Linq.ThrowHelper.ThrowNoElementsException()
2020-11-05T22:02:56.836100207Z at System.Linq.Enumerable.Single[TSource](IEnumerable`1 source)
2020-11-05T22:02:56.836104807Z at Microsoft.EntityFrameworkCore.Query.Internal.QueryCompiler.Execute[TResult](Expression query)
2020-11-05T22:02:56.836108608Z at Microsoft.EntityFrameworkCore.Query.Internal.EntityQueryProvider.Execute[TResult](Expression expression)
2020-11-05T22:02:56.836112308Z at System.Linq.Queryable.Last[TSource](IQueryable`1 source, Expression`1 predicate)
2020-11-05T22:02:56.836116208Z at CoHO.Pages.AdminIndexModel.OnPostYearReport()
2020-11-05T22:02:56.836119808Z at lambda_method(Closure , Object , Object[] )
2020-11-05T22:02:56.836123308Z at Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.ExecutorFactory.ActionResultHandlerMethod.Execute(Object receiver, Object[] arguments)
2020-11-05T22:02:56.836136008Z at Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.PageActionInvoker.InvokeHandlerMethodAsync()
2020-11-05T22:02:56.836140608Z at Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.PageActionInvoker.InvokeNextPageFilterAsync()
2020-11-05T22:02:56.836144108Z at Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.PageActionInvoker.Rethrow(PageHandlerExecutedContext context)
2020-11-05T22:02:56.836148008Z at Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.PageActionInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)
2020-11-05T22:02:56.836152308Z at Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.PageActionInvoker.InvokeInnerFilterAsync()
2020-11-05T22:02:56.847402167Z at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeNextResourceFilter>g__Awaited|24_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)
2020-11-05T22:02:56.847418568Z at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.Rethrow(ResourceExecutedContextSealed context)
2020-11-05T22:02:56.847423868Z at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)
2020-11-05T22:02:56.847428268Z at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.InvokeFilterPipelineAsync()
2020-11-05T22:02:56.847432068Z --- End of stack trace from previous location where exception was thrown ---
2020-11-05T22:02:56.847442968Z at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeAsync>g__Awaited|17_0(ResourceInvoker invoker, Task task, IDisposable scope)
2020-11-05T22:02:56.847464868Z at Microsoft.AspNetCore.Routing.EndpointMiddleware.<Invoke>g__AwaitRequestTask|6_0(Endpoint endpoint, Task requestTask, ILogger logger)
2020-11-05T22:02:56.847469568Z at Microsoft.AspNetCore.Authorization.AuthorizationMiddleware.Invoke(HttpContext context)
2020-11-05T22:02:56.847483869Z at Microsoft.AspNetCore.Authentication.AuthenticationMiddleware.Invoke(HttpContext context)
2020-11-05T22:02:56.847487269Z at Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware.<Invoke>g__Awaited|6_0(ExceptionHandlerMiddleware middleware, HttpContext context, Task task)
```

Turns out, the value of hours was not set and the website was crashing because it was trying to call last on an empty list of values. This was very hard to debug because I wasn't able to run the project locally and for a long time I was unable to view logs from the Azure App Service.