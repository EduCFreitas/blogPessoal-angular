import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  
  key= 'data'
  reverse = true
  listaPostagens: Postagem[]
  postagem: Postagem = new Postagem
  alerta:boolean = false
  titulo:string
  pesquisa:boolean = false
  
  constructor(private postagemService:PostagemService, private route:ActivatedRoute, private router:Router, private locationPage:Location) { }
  
  ngOnInit() {
    this.findAllPostagens()
    
    let item:string = localStorage.getItem('delOk')
    if (item === "true"){
      this.alerta = true
      localStorage.clear()
      
      setTimeout(()=>{
        this.refresh()
      }, 2000)
      
    }
    
    // window.scroll(0, 0)
  }
  
  findAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }
  
  publicar(){
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.refresh();
    })
  }

  pesquisarPorTitulo(){
    this.postagemService.findByTitulo(this.titulo).subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
      this.pesquisa = true
    })
  }

  refresh(){
    this.router.navigateByUrl('/lista-post', {skipLocationChange:true}).then(()=>{
      this.router.navigate([this.locationPage.path()])
    })
  }
  
}
