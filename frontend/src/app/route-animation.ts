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
    transition('Default => *', slideto('right')),
    transition('* => Default', slideto('left')),

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