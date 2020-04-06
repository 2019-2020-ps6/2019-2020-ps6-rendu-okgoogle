import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
} from '@angular/animations';


export const slideInAnimation =
    
trigger('routeAnimations', [
    transition('Login => *', slideto('right')),

    transition('Login => UserList', slideto('right')),
    transition('UserList => Login', slideto('left')),

    transition('UserList => ThemeList', slideto('right')),
    transition('ThemeList => UserList', slideto('left')),

    transition('ThemeList => QuizList', slideto('right')),
    transition('QuizList => ThemeList', slideto('left')),

    transition('QuizList => PlayQuiz', slideto('right')),
    transition('PlayQuiz => QuizList', slideto('left')),
    
    transition('Login => MainAdmin', slideto('right')),
    transition('MainAdmin => Login', slideto('left')),

    transition('MainAdmin => CreateTheme', slideto('right')),
    transition('CreateTheme => MainAdmin', slideto('left')),

    transition('MainAdmin => CreateUser', slideto('right')),
    transition('CreateUser => MainAdmin', slideto('left')),

    transition('MainAdmin => UserList', slideto('right')),
    transition('UserList => MainAdmin', slideto('left')),

    transition('MainAdmin => ThemeList', slideto('right')),
    transition('ThemeList => MainAdmin', slideto('left')),

    transition('QuizList => EditQuiz', slideto('right')),
    transition('EditQuiz => QuizList', slideto('left')),

    transition('EditQuiz => EditQuestion', slideto('right')),
    transition('EditQuestion => EditQuiz', slideto('left')),

    transition('EditQuestion => EditAnswer', slideto('right')),
    transition('EditAnswer => EditQuestion', slideto('left')),

    transition('UserList => UserStat', slideto('right')),
    transition('UserStat => UserList', slideto('left')),

    transition('UserStat <=> UserStatDetails', slideto('right')),
    transition('UserStatDetails <=> UserStat', slideto('left')),
])
//   trigger('routeAnimations', [
//     transition('Home <=> UserList', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('UserList <=> ThemeList', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('ThemeList <=> QuizList', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('QuizList <=> PlayQuiz', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('Home <=> MainAdmin', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('MainAdmin <=> CreateTheme', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('MainAdmin <=> CreateUser', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('MainAdmin <=> UserList', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('MainAdmin <=> ThemeList', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('QuizList <=> EditQuiz', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('EditQuiz <=> EditQuestion', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('EditQuestion <=> EditAnswer', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('UserList <=> UserStat', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ]),
//     transition('UserStat <=> UserStatDetails', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//             ], { optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//             ], { optional: true }),
//         ])
//     ])
//   ]);


  function slideto(direction){
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({ 
                position: 'fixed', 
                //top:0,
                [direction]:0,
                width: '100%'
            })
        ], optional),
        query(':enter',[
            style({[direction]: '-100%'})
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style( {[direction]: '100%'} ) )
            ],optional),
            query(':enter', [
                animate('600ms ease', style( {[direction]: '0%'} ) )
            ]),

        ])
    ]
  }