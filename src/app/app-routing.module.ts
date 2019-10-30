import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'setting-modal', loadChildren: './setting-modal/setting-modal.module#SettingModalPageModule' },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule' },
  { path: 'direction', loadChildren: './direction/direction.module#DirectionPageModule' },
  { path: 'modal-map', loadChildren: './modal-map/modal-map.module#ModalMapPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
