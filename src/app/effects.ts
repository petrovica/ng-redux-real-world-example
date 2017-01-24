import { EffectsModule } from '@ngrx/effects';

import { ExploreEffects } from './components/Explore/Explore.effects';
import { UserEffects } from './components/User/User.effects';
import { RepoEffects } from './components/Repo/Repo.effects';


export const effects = [
  EffectsModule.run(ExploreEffects),
  EffectsModule.run(UserEffects),
  EffectsModule.run(RepoEffects)
];
