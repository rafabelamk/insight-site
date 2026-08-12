'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

// TODO: troque pelo número real de WhatsApp da Insight (formato 55DDDNUMERO)
const WA = 'https://wa.me/5500000000000?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita!'

// TODO: ajuste os números para os reais da Insight
const STATS = [
  { icon: true, label: 'Negócios de diversos nichos impactados' },
  { value: '+3', label: 'Verticais de clientes atendidas' },
  { value: '100%', label: 'Campanhas orientadas por dados' },
  { value: '360°', label: 'Conteúdo, tráfego e tecnologia integrados' },
]

// TODO: troque pelos depoimentos reais dos seus clientes (Orsegups, Ótica Rio Branco, Terra Milia, etc.)
const TESTIMONIALS = [
  { name: '[Nome do cliente]', handle: '@clientehandle', initials: 'OR', color: '#adf01b',
    text: '[Adicione aqui um depoimento real de um cliente sobre o trabalho da Insight.]' },
  { name: '[Nome do cliente]', handle: '@clientehandle', initials: 'OB', color: '#adf01b',
    text: '[Adicione aqui um depoimento real de um cliente sobre o trabalho da Insight.]' },
  { name: '[Nome do cliente]', handle: '@clientehandle', initials: 'TM', color: '#adf01b',
    text: '[Adicione aqui um depoimento real de um cliente sobre o trabalho da Insight.]' },
  { name: '[Nome do cliente]', handle: '@clientehandle', initials: 'IN', color: '#adf01b',
    text: '[Adicione aqui um depoimento real de um cliente sobre o trabalho da Insight.]' },
]

// TODO: troque os placeholders "otica-rio-branco.png" e "terra-milia.png" pelos logos reais
const LOGOS = [
  { name: 'Orsegups', file: '/logos/orsegups.png' },
  { name: 'Ótica Rio Branco', file: '/logos/otica-rio-branco.png' },
  { name: 'Terra Milia', file: '/logos/terra-milia.png' },
]

const PILARES = [
  { num: '01', title: 'Clareza', emoji: '🔎',
    desc: 'Dados claros e abertos. Autonomia pra decidir com segurança.',
    detail: 'Crescimento com clareza' },
  { num: '02', title: 'Dados', emoji: '📊',
    desc: 'A gente corta o que não tem performance e melhora o que já está bom.',
    detail: 'Decisões com dados reais' },
  { num: '03', title: 'Contexto', emoji: '🥇',
    desc: 'A gente entrega os números que mandam no seu resultado e o que vai ser feito a partir deles.',
    detail: 'Métricas sem contexto são ruído. Dados com clareza são ouro.' },
]

const FAQ_DATA = [
  { q: 'Eu realmente preciso de um profissional para gerenciar meus anúncios?',
    a: 'Sim. Um gestor de tráfego evita desperdício de verba, testa hipóteses com método e otimiza campanhas com base em dados reais, algo difícil de fazer sem experiência dedicada.' },
  { q: 'Consigo anunciar só para clientes na minha região?',
    a: 'Sim, é possível segmentar campanhas por região, bairro ou raio de distância ao redor do seu negócio.' },
  { q: 'Qual o investimento mínimo em anúncios para ter resultados?',
    a: 'Trabalhamos com quem já investe ou pretende investir pelo menos R$1.500/mês em anúncios. Na consultoria inicial, definimos junto com você o orçamento ideal para o seu momento.' },
  { q: 'Quando começo a ver os resultados?',
    a: 'Os primeiros dados aparecem já nas primeiras semanas, mas otimizações consistentes costumam mostrar resultados mais sólidos a partir do primeiro mês.' },
  { q: 'Preciso ter um site para anunciar?',
    a: 'Não necessariamente. É possível gerar leads via WhatsApp, formulários ou redes sociais, dependendo da estratégia do seu negócio.' },
  { q: 'Como funciona o contrato e o pagamento?',
    a: 'Trabalhamos com contrato mensal, sem fidelidade de longo prazo, com escopo e valores alinhados na proposta.' },
]

const INDICACOES = [
  { icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
    title: 'Ter um bom comercial',
    text: 'O tráfego pago atrai as pessoas certas até o seu canal de vendas — mas as vendas dependem do seu processo comercial. Certifique-se de ter um atendimento estruturado e pronto para converter os leads que chegarem.' },
  { icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    title: 'Produção de Conteúdo e Redes Sociais',
    text: 'Seu perfil é sua vitrine. Quando os leads do anúncio visitarem seu Instagram ou Facebook, ele precisa ser claro, esteticamente agradável e com conteúdo estratégico que gere confiança. A Insight te auxilia com produção e distribuição estratégica de conteúdo nas redes sociais.' },
  { icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    title: 'Orçamento para anúncios',
    text: 'Trabalhamos com clientes que já investem ou pretendem investir pelo menos R$1.500/mês em anúncios — esse é o ponto de partida pra ter volume de dados suficiente e resultado consistente.' },
]

// ── Icons ──
function IconWA({ className = 'w-5 h-5' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
}
function IconIG({ className = 'w-5 h-5' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
}
function IconLI({ className = 'w-5 h-5' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function IconMeta() {
  return <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10"><path d="M18 14.4c-1.944-2.916-4.86-5.4-7.344-5.4C5.724 9 3 13.428 3 18c0 2.916.756 4.86 2.268 4.86 1.08 0 2.268-.972 3.888-3.024L10.8 17.46c.756-1.08 1.512-2.268 2.376-3.24.756.864 1.404 1.944 2.052 3.024l1.512 2.7C14.796 23.028 12.96 25.02 10.8 25.02c-1.404 0-2.7-.54-3.672-1.62C5.4 21.78 4.5 19.62 4.5 17.028 4.5 12.204 7.2 7.5 11.196 7.5c3.348 0 6.48 2.916 8.532 5.832.54-.756 1.08-1.512 1.62-2.16C23.22 8.904 25.488 7.5 27.972 7.5 31.968 7.5 34.5 12.204 34.5 17.028c0 2.592-.9 4.752-2.628 6.372-.972 1.08-2.268 1.62-3.672 1.62-2.16 0-3.996-1.98-5.94-5.4l-1.512-2.7c-.648-1.08-1.296-2.16-2.052-3.024-.864.972-1.62 2.16-2.376 3.24l-1.728 2.376c1.62 2.052 2.7 3.024 3.888 3.024C20.916 22.86 21.6 20.916 21.6 18c0-4.572-2.7-9-6.66-9-2.484 0-5.4 2.484-7.344 5.4" fill="#0082FB"/></svg>
}
function IconGoogleAds() {
  return <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><path d="M3.5 30.5L14 11l6.5 11.25L14 33.5 3.5 30.5z" fill="#FBBC04"/><path d="M20.5 22.25L14 11 26.5 11 33 22.25 20.5 22.25z" fill="#4285F4"/><circle cx="33" cy="30.5" r="6.5" fill="#34A853"/></svg>
}
function Star() {
  return <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
}
function GoogleBadge() {
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
}

function PhoneMockup() {
  return (
    <div className="relative" style={{width:'480px',height:'660px',flexShrink:0}}>
      {/* Glow */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(29,78,216,0.18) 0%,transparent 60%)',filter:'blur(40px)',pointerEvents:'none',borderRadius:'50%'}}/>
      {/* Phone shell */}
      <div style={{position:'absolute',left:'100px',top:'50px',width:'280px',height:'560px',background:'linear-gradient(160deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 100%)',border:'1.5px solid rgba(255,255,255,0.16)',borderRadius:'52px',boxShadow:'0 32px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.1)'}}>
        {/* Dynamic island */}
        <div style={{position:'absolute',top:'14px',left:'50%',transform:'translateX(-50%)',width:'100px',height:'28px',background:'#030712',borderRadius:'16px'}}/>
        {/* Side buttons */}
        <div style={{position:'absolute',left:'-2px',top:'100px',width:'2px',height:'36px',background:'rgba(255,255,255,0.14)',borderRadius:'2px 0 0 2px'}}/>
        <div style={{position:'absolute',left:'-2px',top:'150px',width:'2px',height:'56px',background:'rgba(255,255,255,0.14)',borderRadius:'2px 0 0 2px'}}/>
        <div style={{position:'absolute',right:'-2px',top:'130px',width:'2px',height:'68px',background:'rgba(255,255,255,0.14)',borderRadius:'0 2px 2px 0'}}/>
        {/* Screen */}
        <div style={{position:'absolute',left:'2px',right:'2px',top:'58px',bottom:'2px',background:'linear-gradient(180deg,#0c0c0c 0%,#000000 100%)',borderRadius:'48px',overflow:'hidden'}}>
          <div style={{padding:'18px 16px',height:'100%',display:'flex',flexDirection:'column',boxSizing:'border-box'}}>
            {/* Status bar */}
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'18px'}}>
              <span style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',fontWeight:'600'}}>9:41</span>
              <span style={{color:'rgba(255,255,255,0.4)',fontSize:'13px'}}>▪▪▪</span>
            </div>
            {/* Platform 2×2 grid */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'12px'}}>
              {[
                {label:'Instagram',bg:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
                 icon:<svg style={{width:'22px',height:'22px',fill:'white'}} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>},
                {label:'Facebook',bg:'#1877f2',
                 icon:<svg style={{width:'22px',height:'22px',fill:'white'}} viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},
                {label:'Google Ads',bg:'white',
                 icon:<svg style={{width:'22px',height:'22px'}} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>},
                {label:'Google Meu Negócio',bg:'white',
                 icon:<svg style={{width:'22px',height:'22px'}} viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#34A853"/><circle cx="12" cy="9" r="1.8" fill="#4285F4"/></svg>},
              ].map((p,i)=>(
                <div key={i} style={{borderRadius:'16px',padding:'12px 8px',display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'12px',background:p.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>{p.icon}</div>
                  <span style={{color:'rgba(255,255,255,0.38)',fontSize:'9px',textAlign:'center',lineHeight:'1.25'}}>{p.label}</span>
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <div style={{borderRadius:'16px',padding:'12px',flex:1,background:'rgba(29,78,216,0.1)',border:'1px solid rgba(29,78,216,0.18)',boxSizing:'border-box'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                <span style={{color:'rgba(255,255,255,0.32)',fontSize:'9px',textTransform:'uppercase',letterSpacing:'0.1em'}}>Performance</span>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4ade80'}}/>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',gap:'4px',height:'44px'}}>
                {[28,44,36,60,50,68,62].map((h,i)=>(
                  <div key={i} style={{flex:1,borderRadius:'4px',height:`${Math.round(h*0.64)}px`,background:i===6?'rgba(59,130,246,0.85)':'rgba(59,130,246,0.2)'}}/>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px'}}>
                <span style={{color:'rgba(255,255,255,0.4)',fontSize:'10px'}}>+32 leads</span>
                <span style={{color:'#4ade80',fontSize:'10px'}}>↑ 22%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Story ring: perfil Instagram */}
      <div style={{position:'absolute',left:'-15px',top:'60px',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:'7px',animation:'floatIcon 3.8s ease-in-out infinite',animationDelay:'0.4s'}}>
        <div style={{width:'140px',height:'140px',borderRadius:'50%',background:'linear-gradient(135deg,#adf01b,#c3ff3d)',padding:'4px',boxShadow:'0 8px 28px rgba(0,0,0,0.3)'}}>
          <div style={{width:'100%',height:'100%',borderRadius:'50%',border:'4px solid #0c0c0c',overflow:'hidden',background:'#0c0c0c',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Image src="/logos/insight-logo-green.png" alt="Insight" width={100} height={26} style={{width:'75%',height:'auto',objectFit:'contain'}}/>
          </div>
        </div>
        {/* TODO: confirme o @ correto do Instagram da Insight */}
        <span style={{color:'rgba(255,255,255,0.6)',fontSize:'11px',fontWeight:'600',letterSpacing:'0.02em'}}>@1sightmkt</span>
      </div>
      {/* Badge 1: novo lead */}
      <div style={{position:'absolute',top:'72px',right:'0',background:'white',borderRadius:'14px',padding:'10px 14px',boxShadow:'0 12px 36px rgba(0,0,0,0.14)',display:'flex',alignItems:'center',gap:'10px',animation:'floatIcon 3s ease-in-out infinite',zIndex:10}}>
        <div style={{width:'32px',height:'32px',borderRadius:'9px',background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg style={{width:'16px',height:'16px',stroke:'white'}} fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
        </div>
        <div><div style={{color:'#111827',fontSize:'13px',fontWeight:'700',lineHeight:'1.3'}}>Novo lead!</div><div style={{color:'#9ca3af',fontSize:'11px'}}>Meta Ads</div></div>
      </div>
      {/* Badge 2: ROAS */}
      <div style={{position:'absolute',top:'280px',left:'0',background:'white',borderRadius:'14px',padding:'10px 14px',boxShadow:'0 12px 36px rgba(0,0,0,0.14)',animation:'floatIcon 3.5s ease-in-out infinite',animationDelay:'0.8s',zIndex:10}}>
        <div style={{color:'#adf01b',fontSize:'15px',fontWeight:'900',lineHeight:'1.3'}}>ROAS 4.2×</div>
        <div style={{color:'#9ca3af',fontSize:'11px'}}>retorno sobre ad spend</div>
      </div>
      {/* Badge 3: conversões */}
      <div style={{position:'absolute',bottom:'90px',right:'0',background:'#0c0c0c',border:'1px solid rgba(59,130,246,0.25)',borderRadius:'14px',padding:'10px 14px',boxShadow:'0 12px 36px rgba(0,0,0,0.28)',animation:'floatIcon 4s ease-in-out infinite',animationDelay:'1.5s',zIndex:10}}>
        <div style={{color:'white',fontSize:'13px',fontWeight:'700',lineHeight:'1.3'}}>↑ 24% conversões</div>
        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>Google Ads</div>
      </div>
    </div>
  )
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [checkedFit, setCheckedFit] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const [activeT, setActiveT] = useState(0)

  const logosRef = useRef(null)

  const useDrag = useCallback((ref) => {
    const el = ref.current
    if (!el) return
    let isDown = false, startX = 0, scrollLeft = 0
    const inner = el.querySelector('[class*="marquee-inner"]')
    const down = (e) => {
      isDown = true
      startX = (e.pageX || e.touches?.[0]?.pageX) - el.offsetLeft
      scrollLeft = el.scrollLeft
      if (inner) inner.classList.add('marquee-dragging')
    }
    const up = () => {
      isDown = false
      if (inner) inner.classList.remove('marquee-dragging')
    }
    const move = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = (e.pageX || e.touches?.[0]?.pageX) - el.offsetLeft
      el.scrollLeft = scrollLeft - (x - startX) * 1.5
    }
    el.addEventListener('mousedown', down)
    el.addEventListener('touchstart', down, { passive: true })
    el.addEventListener('mouseleave', up)
    el.addEventListener('mouseup', up)
    el.addEventListener('touchend', up)
    el.addEventListener('mousemove', move)
    el.addEventListener('touchmove', move, { passive: false })
    return () => {
      el.removeEventListener('mousedown', down)
      el.removeEventListener('touchstart', down)
      el.removeEventListener('mouseleave', up)
      el.removeEventListener('mouseup', up)
      el.removeEventListener('touchend', up)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('touchmove', move)
    }
  }, [])

  useEffect(() => { return useDrag(logosRef) }, [useDrag])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-[#0c0c0c] ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2">
            <Image src="/logos/insight-logo-green.png" alt="Insight" width={140} height={37} className="h-6 w-auto object-contain"/>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[['#servicos','Serviços'],['#metodo','Como trabalhamos'],['#sobre','Sobre'],['#faq','FAQ']].map(([href,label]) => (
              <a key={href} href={href} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">{label}</a>
            ))}
            <a href={WA} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#adf01b] hover:bg-[#c3ff3d] text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105">
              <IconWA className="w-4 h-4"/> Fale comigo
            </a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2">
            {mobileOpen
              ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-[#0c0c0c] border-t border-white/10 py-6 px-5 flex flex-col gap-2">
            {[['#servicos','Serviços'],['#metodo','Como trabalhamos'],['#sobre','Sobre'],['#faq','FAQ']].map(([href,label]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="text-gray-200 hover:text-white text-base font-medium py-3 border-b border-white/5">{label}</a>
            ))}
            <a href={WA} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}
               className="flex items-center justify-center gap-2 bg-[#adf01b] text-black px-6 py-3.5 rounded-full font-bold mt-3">
              <IconWA className="w-5 h-5"/> Falar no WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative bg-[#0c0c0c] pt-24 pb-6 lg:pt-24 lg:pb-8 px-5 sm:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[#adf01b]/8 to-transparent pointer-events-none"/>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#adf01b]/5 rounded-full blur-3xl pointer-events-none"/>
        <div className="max-w-6xl mx-auto relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {/* Meta Ads — fundo branco, símbolo ∞ gradiente azul oficial */}
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide" style={{background:'white',color:'#1c2b4b'}}>
                  <svg style={{width:'18px',height:'11px',flexShrink:0}} viewBox="0 0 60 36" fill="none">
                    <defs>
                      <linearGradient id="meta-g" x1="0" y1="18" x2="60" y2="18" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#0082FB"/>
                        <stop offset="100%" stopColor="#00B2FF"/>
                      </linearGradient>
                    </defs>
                    <path d="M15 3C8.4 3 3 10.3 3 18s5.4 15 12 15c4.5 0 9-4 12-9.6C30 29 34.5 33 39 33c6.6 0 12-6.7 12-15S45.6 3 39 3c-4.5 0-9 4-12 9.6C24 7 19.5 3 15 3z" fill="url(#meta-g)"/>
                  </svg>
                  Meta Ads
                </span>
                {/* Google Ads — fundo branco, ícone GA colorido */}
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide" style={{background:'white',color:'#1c2b4b'}}>
                  <svg style={{width:'16px',height:'16px',flexShrink:0}} viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google Ads
                </span>
                {/* Performance — fundo branco */}
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide" style={{background:'white',color:'#1c2b4b'}}>
                  <svg style={{width:'13px',height:'13px',flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="#1c2b4b" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                  Performance
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.08] mb-4">
                Transforme cliques em leads, vendas e <span className="text-[#adf01b]">crescimento real e mensurável.</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                Somos a Insight, agência de tráfego pago, produção de conteúdo e tecnologia. Impulsionamos negócios locais, digitais e marcas a crescerem de forma previsível com estratégia, dados e otimização contínua.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={WA} target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 bg-[#adf01b] hover:bg-[#c3ff3d] text-black px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-lime-900/30">
                  <IconWA className="w-5 h-5"/> Quero uma análise gratuita
                </a>
                <a href="#servicos" className="border border-white/25 hover:border-white/50 text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all hover:bg-white/5">Ver serviços ↓</a>
              </div>
            </div>
            {/* Mockup desktop */}
            <div className="hidden lg:flex justify-center items-start overflow-hidden" style={{height:'480px', paddingTop:'20px'}}>
              <div style={{transform:'scale(0.68)',transformOrigin:'top center'}}>
                <PhoneMockup/>
              </div>
            </div>
            {/* Mockup mobile: centralizado, escala controlada, sem espaço vazio */}
            <div className="flex lg:hidden justify-center items-start overflow-hidden" style={{height:'260px',marginTop:'4px'}}>
              <div style={{transform:'scale(0.48)',transformOrigin:'top center'}}>
                <PhoneMockup/>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-4 pt-4 lg:mt-6 lg:pt-6 border-t border-white/10">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col gap-2">
                {s.icon ? (
                  <svg className="w-10 h-10 text-[#adf01b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.5 2.5l1.75 5.25 5.25 1.75-5.25 1.75L11.5 16.5l-1.75-5.25L4.5 9.5l5.25-1.75z"/>
                    <path d="M4 14.5l.85 2.55L7.4 18l-2.55.85L4 21.4l-.85-2.55L.6 18l2.55-.85z" opacity="0.55"/>
                    <path d="M20 3.5l.65 1.95L22.6 6.2l-1.95.65L20 8.8l-.65-1.95L17.4 6.2l1.95-.65z" opacity="0.4"/>
                  </svg>
                ) : (
                  <span className="text-4xl md:text-5xl font-black text-white">{s.value}</span>
                )}
                <span className="text-gray-400 text-sm leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="bg-[#adf01b] py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-black/60 text-xs font-bold uppercase tracking-widest mb-1">Análise gratuita e sem compromisso</p>
            <h2 className="text-black text-2xl md:text-3xl font-black leading-tight">Descubra como escalar seu negócio com tráfego pago estratégico</h2>
          </div>
          <a href={WA} target="_blank" rel="noreferrer"
             className="flex-shrink-0 flex items-center gap-2 bg-black hover:bg-gray-900 text-[#adf01b] px-8 py-4 rounded-full font-bold transition-all hover:scale-105">
            <IconWA className="w-5 h-5"/> Falar no WhatsApp →
          </a>
        </div>
      </section>

      {/* SOMOS SÓ MAIS UMA AGÊNCIA */}
      <section className="relative">
        <div className="bg-[#adf01b] pt-14 pb-24 px-5 sm:px-8 relative overflow-hidden">
          <h2 className="max-w-3xl mx-auto text-4xl sm:text-5xl md:text-6xl font-black text-[#0c0c0c] leading-[1.05]">
            Somos só mais uma agência.
          </h2>
          <div className="absolute -bottom-10 right-6 sm:right-16 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white shadow-xl flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0c0c0c]"/>
          </div>
        </div>
        <div className="bg-[#0c0c0c] py-10 px-5 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">E isso é o que nos diferencia.</h3>
            <p className="text-gray-400 text-sm sm:text-base">Não fazemos mil promessas. Fazemos acontecer — com método, rotina de otimização e número na mesa toda semana.</p>
          </div>
        </div>
      </section>

      {/* PLATAFORMAS */}
      <section className="bg-white py-8 sm:py-12 px-5 sm:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-10">Plataformas onde a <span className="font-black">InSight</span> anuncia para o seu negócio</p>
          <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-16 overflow-x-auto">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}}>
                <IconIG className="w-6 h-6 sm:w-8 sm:h-8 text-white"/>
              </div>
              <span className="text-gray-600 text-xs sm:text-sm font-semibold">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#25d366] flex items-center justify-center">
                <IconWA className="w-6 h-6 sm:w-8 sm:h-8 text-white"/>
              </div>
              <span className="text-gray-600 text-xs sm:text-sm font-semibold">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#1877f2] flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <span className="text-gray-600 text-xs sm:text-sm font-semibold">Facebook</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
              <span className="text-gray-600 text-xs sm:text-sm font-semibold">Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE A INSIGHT */}
      <section className="bg-[#adf01b] py-12 sm:py-20 px-5 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.06]">
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} className="whitespace-nowrap text-[#0c0c0c] font-black tracking-widest py-1"
                 style={{fontSize:'4rem', transform: `translateX(${i % 2 === 0 ? '0%' : '-8%'})`}}>
              {'INSIGHT INSIGHT INSIGHT INSIGHT INSIGHT '}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto relative text-center">
          <Image
            src="/logos/insight-logo-dark.png"
            alt="InSight"
            width={302}
            height={80}
            className="h-9 md:h-12 w-auto object-contain mx-auto mb-6"
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0c0c0c] leading-tight mb-5">
            A InSight é pra quem quer ter <span className="text-white">tudo à vista</span> e crescer com <span className="text-white">previsibilidade</span>
          </h2>
          <p className="text-[#0c0c0c]/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Metodologia própria de gestão de tráfego pago que une estratégia, dados e execução — sem achismo, sem promessa vazia. Cada real investido tem propósito, cada resultado é mensurável, e cada decisão é orientada por número real, não por intuição.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="bg-[#f4f4f4] py-10 sm:py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="inline-block bg-[#adf01b] text-black text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-full">Serviços</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0c0c0c] text-center mb-4 leading-tight">
            Especializados para<br/><span className="text-[#adf01b]">impulsionar seu negócio</span>
          </h2>
          <p className="text-gray-500 text-center mb-6 sm:mb-14 max-w-xl mx-auto">Gestão completa nas plataformas que mais convertem, com estratégia e dados reais.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100">
              <div className="mb-5 w-16 h-16 rounded-2xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}}>
                <IconIG className="w-8 h-8 text-white"/>
              </div>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Tráfego Pago</span>
              <h3 className="text-[#0c0c0c] font-black text-lg leading-tight">Instagram Ads e Facebook Ads</h3>
            </div>
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100">
              <div className="mb-5 w-16 h-16 bg-white rounded-2xl border-2 border-gray-100 flex items-center justify-center shadow-sm">
                <svg className="w-9 h-9" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Tráfego Pago</span>
              <h3 className="text-[#0c0c0c] font-black text-lg leading-tight">Google Ads</h3>
            </div>
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100">
              <div className="mb-5 w-16 h-16 bg-[#f4f4f4] rounded-2xl flex items-center justify-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)'}}><IconIG className="w-4 h-4 text-white"/></div>
                  <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center border-2 border-white"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                </div>
              </div>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Criação</span>
              <h3 className="text-[#0c0c0c] font-black text-lg leading-tight">Criativos em imagem de ads focados em conversão</h3>
            </div>
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100">
              <div className="mb-5 w-16 h-16 rounded-2xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#adf01b,#c3ff3d)'}}>
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 36 36" stroke="currentColor" strokeWidth="1.6">
                  <rect x="5" y="12" width="26" height="18" rx="2.5" strokeLinecap="round"/>
                  <path d="M12 12V9a6 6 0 0112 0v3" strokeLinecap="round"/>
                  <path d="M10 20h4M22 20h4M10 26h4M22 26h4M17 20h2M17 26h2" strokeLinecap="round"/>
                  <circle cx="18" cy="23" r="2.5" fill="currentColor" stroke="none" opacity="0.3"/>
                  <path d="M14 23h8" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Consultoria</span>
              <h3 className="text-[#0c0c0c] font-black text-lg leading-tight">Consultoria em Tráfego Pago</h3>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="bg-white py-10 sm:py-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-[#0c0c0c] text-center mb-6 sm:mb-14 leading-tight flex flex-wrap items-center justify-center gap-3">
            <span>Para quem é a</span>
            <Image
              src="/logos/insight-logo.png"
              alt="InSight"
              width={310}
              height={80}
              className="h-12 md:h-16 w-auto object-contain"
            />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon:<svg className="w-7 h-7 text-[#adf01b]" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.8"><circle cx="15" cy="10" r="5"/><path d="M5 28c0-5.523 4.477-10 10-10s10 4.477 10 10" strokeLinecap="round"/><path d="M24 4v8M20 8h8" strokeLinecap="round"/></svg>, text:'Precisa adquirir novos clientes' },
              { icon:<svg className="w-7 h-7 text-[#adf01b]" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.8"><circle cx="24" cy="7" r="3"/><circle cx="8" cy="16" r="3"/><circle cx="24" cy="25" r="3"/><path d="M11 14.5l10-6M11 17.5l10 6" strokeLinecap="round"/></svg>, text:'Quer distribuir conteúdo' },
              { icon:<svg className="w-7 h-7 text-[#adf01b]" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.8"><path d="M4 22l7-8 6 6 10-12" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 28h24" strokeLinecap="round"/></svg>, text:'Quer aumentar suas vendas' },
              { icon:<svg className="w-7 h-7 text-[#adf01b]" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.8"><path d="M5 20V12h6l10-6v20L11 20H5z" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 10c2.2 1.6 3.5 4 3.5 6s-1.3 4.4-3.5 6" strokeLinecap="round"/></svg>, text:'Quer anunciar de forma profissional' },
              { icon:<svg className="w-7 h-7 text-[#adf01b]" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="24" height="24" rx="4" strokeLinecap="round"/><path d="M11 11l10 10M21 11l-10 10" strokeLinecap="round"/></svg>, text:'Fez tráfego e obteve resultados ruins' },
              { icon:<svg className="w-7 h-7 text-[#adf01b]" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.8"><circle cx="16" cy="16" r="11"/><path d="M16 10v6l4 2" strokeLinecap="round"/></svg>, text:'Não tem tempo de fazer seus próprios anúncios' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <p className="text-[#0c0c0c] font-bold text-sm leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA VOCÊ SE... */}
      <section className="bg-[#f4f4f4] py-10 sm:py-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-[#0c0c0c] text-center mb-6 sm:mb-14 leading-tight flex flex-wrap items-center justify-center gap-3">
            <span>A</span>
            <Image
              src="/logos/insight-logo.png"
              alt="InSight"
              width={310}
              height={80}
              className="h-12 md:h-16 w-auto object-contain"
            />
            <span>é para você <span className="text-[#adf01b]">se…</span></span>
          </h2>

          <div className="space-y-3.5">
            {[
              'Quer crescer com anúncios de forma previsível',
              'Já investe ou pretende investir pelo menos R$ 1.500/mês',
              'Busca uma parceira estratégica, não uma "apertadora de botão"',
              'Valoriza dados, processo e visão de longo prazo',
            ].map((text, i) => {
              const checked = checkedFit.includes(i)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCheckedFit(p => checked ? p.filter(x => x !== i) : [...p, i])}
                  aria-pressed={checked}
                  className={`w-full flex items-center gap-4 text-left bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
                    checked
                      ? 'border-[#adf01b] shadow-md -translate-y-0.5 ring-1 ring-[#adf01b]/20'
                      : 'border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <span
                    className={`relative flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      checked ? 'bg-[#adf01b] border-[#adf01b] scale-105' : 'bg-white border-gray-300'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 text-white transition-all duration-300 ${
                        checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className={`font-bold text-[15px] sm:text-base leading-snug transition-colors duration-300 ${
                    checked ? 'text-[#0c0c0c]' : 'text-[#0c0c0c]/90'
                  }`}>
                    {text}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="my-5 sm:my-6 border-t border-gray-200/70" />

          <div className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </span>
            <p className="text-[#0c0c0c] text-[15px] sm:text-base leading-relaxed">
              <span className="font-black">Não é para quem</span> busca milagre, promessas irreais ou tráfego sem estratégia.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE EU ENTREGO */}
      <section className="bg-[#000000] py-8 sm:py-14 px-5 sm:px-8 relative overflow-hidden">
        {/* Watermark background */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="whitespace-nowrap text-white font-black tracking-widest py-1 opacity-[0.04]"
                 style={{fontSize:'4rem', transform: `translateX(${i % 2 === 0 ? '0%' : '-8%'})`}}>
              {'INSIGHT INSIGHT INSIGHT INSIGHT INSIGHT '}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 sm:mb-14 leading-tight flex flex-wrap items-center justify-center gap-3 text-center">
            <span>O que a</span>
            <Image
              src="/logos/insight-logo-green.png"
              alt="InSight"
              width={302}
              height={80}
              className="h-14 md:h-20 w-auto object-contain self-center -translate-y-0.5"
            />
            <span className="text-[#adf01b]">entrega?</span>
          </h2>

          {[
            { num: '01', title: 'Tráfego Pago — Meta Ads', sub: 'Campanhas estratégicas no Facebook e Instagram com foco em geração de leads e crescimento de base.' },
            { num: '02', title: 'Tráfego Pago — Google Ads', sub: 'Anúncios na rede de pesquisa e display para capturar intenção de compra no momento certo.' },
            { num: '03', title: 'Consultoria em Tráfego Pago', sub: 'Diagnóstico estratégico completo com plano de ação personalizado para o seu negócio.' },
            { num: '04', title: 'Relatórios & Performance', sub: 'Relatórios periódicos com KPIs, CPL, ROAS e a progressão histórica dos seus resultados.' },
            { num: '05', title: 'Dashboards Sob Medida', sub: 'Inteligência de dados para acompanhar performance em tempo real e decidir com base em número real.' },
            { num: '06', title: 'Landing Pages de Alta Conversão', sub: 'Página feita pra uma coisa só: virar lead. Estrutura, copy, velocidade e teste até o custo cair.' },
            { num: '07', title: 'Rastreamento de Conversões', sub: 'Google Tag Manager e Pixel do Meta instalados, testados e validados. Sem conversão perdida, sem número inventado.' },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-start gap-5 py-7 group cursor-default transition-all ${i < arr.length - 1 ? 'border-b border-white/10 hover:border-white/25' : ''}`}>
              <span className="text-gray-600 text-sm font-bold w-8 flex-shrink-0 pt-1">{item.num}</span>
              <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5 group-hover:text-[#adf01b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
              <div className="flex-1">
                <h3 className="text-white font-black text-xl md:text-2xl mb-1.5 group-hover:text-[#adf01b] transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-[15px] leading-relaxed">{item.sub}</p>
              </div>
              <svg className="w-5 h-5 text-gray-700 flex-shrink-0 mt-1 group-hover:text-[#adf01b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* PILARES */}
      <section id="metodo" className="bg-[#0c0c0c] py-8 sm:py-14 px-5 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#adf01b_0%,_transparent_55%)] opacity-10 pointer-events-none"/>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-8 sm:mb-16">
            <span className="inline-block bg-[#adf01b]/20 border border-[#adf01b]/40 text-[#c3ff3d] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">O que muda no seu dia</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2">Tudo à <span className="text-[#adf01b]">sua vista</span></h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">Não fazemos mil promessas. Fazemos acontecer — com método, rotina de otimização e número na mesa toda semana.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILARES.map((step, i) => (
              <div key={step.num} className="group relative bg-white/10 border border-white/20 hover:border-[#adf01b]/60 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20">
                {i < 2 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-[#adf01b] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                )}
                <div className="flex items-start justify-between mb-5">
                  <span className="text-7xl font-black text-white/30 group-hover:text-[#adf01b]/50 transition-colors leading-none select-none">{step.num}</span>
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-gray-200 leading-relaxed mb-6 text-[15px]">{step.desc}</p>
                <div className="border-t border-white/20 pt-5">
                  <p className="text-[#c3ff3d] text-xs font-semibold leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <a href={WA} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 bg-[#adf01b] hover:bg-[#c3ff3d] text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-lime-900/30">
              <IconWA className="w-5 h-5"/> Quero ver meus números com clareza
            </a>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-[#f4f4f4] py-8 sm:py-12 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#0c0c0c]">O que os clientes da <span className="text-[#adf01b]">InSight</span> dizem</h2>
          </div>
          {/* Desktop: grid 4 colunas */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{backgroundColor: t.color}}>{t.initials}</div>
                    <div>
                      <p className="font-black text-[#0c0c0c] text-sm leading-tight">{t.name}</p>
                      <p className="text-gray-400 text-[11px]">{t.handle}</p>
                    </div>
                  </div>
                  <GoogleBadge/>
                </div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, s) => <Star key={s}/>)}</div>
                <p className="text-gray-600 text-[13px] leading-relaxed flex-1">"{t.text}"</p>
              </div>
            ))}
          </div>
          {/* Mobile: carrossel */}
          <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5" style={{scrollbarWidth:'none',msOverflowStyle:'none'}}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-gray-100 snap-start flex-shrink-0" style={{width:'calc(100vw - 60px)'}}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{backgroundColor: t.color}}>{t.initials}</div>
                    <div>
                      <p className="font-black text-[#0c0c0c] text-sm leading-tight">{t.name}</p>
                      <p className="text-gray-400 text-[11px]">{t.handle}</p>
                    </div>
                  </div>
                  <GoogleBadge/>
                </div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, s) => <Star key={s}/>)}</div>
                <p className="text-gray-600 text-[13px] leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
          <div className="flex sm:hidden justify-center gap-1.5 mt-3">
            {TESTIMONIALS.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#adf01b]/30"/>)}
          </div>
        </div>
      </section>

      {/* CLIENTES ATENDIDOS */}
      <section className="bg-white py-8 sm:py-12 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="text-[#adf01b] text-sm font-bold tracking-widest uppercase">Portfólio</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0c0c0c] mt-3">Clientes já atendidos</h2>
          </div>
          {/* Marquee automático */}
          <div ref={logosRef} className="overflow-hidden -mx-5 sm:-mx-8 cursor-grab select-none" style={{overflowX:'auto',scrollbarWidth:'none'}}>
            <div className="marquee-inner">
              {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0 w-24">
                  <div className="w-20 h-20 bg-white rounded-[22px] flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                      <Image src={logo.file} alt={logo.name} fill className="object-cover" sizes="64px"/>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs font-medium text-center w-full leading-tight">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="bg-[#f4f4f4] pt-10 pb-6 sm:pt-16 sm:pb-8 px-5 sm:px-8 relative overflow-hidden">
        {/* Watermark background */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="whitespace-nowrap text-[#0c0c0c] font-black tracking-widest py-1 opacity-[0.04]"
                 style={{fontSize:'4rem', transform: `translateX(${i % 2 === 0 ? '0%' : '-8%'})`}}>
              {'INSIGHT INSIGHT INSIGHT INSIGHT INSIGHT '}
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="mb-10 sm:mb-14 text-center">
            <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-[#0c0c0c] text-xs font-bold uppercase tracking-widest shadow-sm">
              <svg className="w-3.5 h-3.5 text-[#adf01b]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/></svg>
              Conheça a Insight
            </span>
            <h3 className="flex flex-wrap items-center justify-center gap-3 text-3xl sm:text-4xl font-black text-[#0c0c0c] mt-4">
              <span>Quem é a</span>
              <Image
                src="/logos/insight-logo-dark.png"
                alt="Insight"
                width={302}
                height={80}
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </h3>
            <div className="w-16 h-1.5 bg-[#0c0c0c] rounded-full mt-4 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-8 md:gap-10 items-center">
            <div className="relative order-2 md:order-1 max-w-xs sm:max-w-sm md:max-w-none mx-auto md:mx-0">
              <div className="bg-[#0c0c0c] rounded-3xl overflow-hidden aspect-[4/5] relative shadow-lg border border-gray-100 flex items-center justify-center p-10">
                <Image src="/logos/insight-logo-green.png" alt="Insight" width={302} height={80} className="w-full h-auto object-contain"/>
                {/* TODO: confirme o @ correto do Instagram da Insight */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#adf01b] rounded-xl p-4">
                  <p className="text-black font-bold text-sm">@1sightmkt</p>
                  <p className="text-black/70 text-xs">Tráfego Pago · Conteúdo · Tecnologia</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['Negócios Locais','Segurança','Varejo','Empreendimentos'].map(n => (
                  <span key={n} className="bg-[#0c0c0c] text-white text-xs font-bold px-4 py-1.5 rounded-full">{n}</span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <a href={WA} target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 bg-[#adf01b] hover:bg-[#c3ff3d] text-black px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105">
                  <IconWA className="w-4 h-4"/> Chama no Direct
                </a>
                {/* TODO: confirme os links reais de Instagram e LinkedIn da Insight */}
                <a href="https://www.instagram.com/1sightmkt/" target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 border border-gray-200 hover:border-pink-400 text-gray-600 hover:text-pink-500 px-6 py-3 rounded-full font-semibold text-sm transition-all">
                  <IconIG className="w-4 h-4"/> Instagram
                </a>
                <a href="#" target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 border border-gray-200 hover:border-[#adf01b] text-gray-600 hover:text-[#adf01b] px-6 py-3 rounded-full font-semibold text-sm transition-all">
                  <IconLI className="w-4 h-4"/> LinkedIn
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-[#adf01b] text-sm font-bold tracking-widest uppercase">Quem somos</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0c0c0c] mt-3 mb-6 leading-tight">A equipe por trás dos resultados</h2>

              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                Somos a <strong className="text-[#0c0c0c]">Insight</strong>, agência especializada em tráfego pago, produção de conteúdo e tecnologia, dedicada a impulsionar o crescimento de negócios locais e marcas. <strong className="text-[#0c0c0c]">Te ajudamos a transformar cliques em clientes.</strong>
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                {/* TODO: personalize com o histórico real de clientes/verticais da Insight */}
                Atuamos com negócios dos mais diversos segmentos — segurança, varejo, empreendimentos e serviços — unindo estratégia de mídia paga, criação de conteúdo e tecnologia sob um mesmo teto.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                Somos responsáveis por criar, monitorar, analisar e otimizar funis de marketing e campanhas de mídia paga para cada cliente.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
                Produzimos relatórios e análises para suportar a tomada de decisão, monitorando o desempenho das campanhas, do funil, o alcance dos KPIs e identificando gargalos e oportunidades de aprimoramento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f4f4f4] py-8 sm:py-14 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-[#adf01b] text-sm font-bold tracking-widest uppercase">Dúvidas frequentes</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0c0c0c] mt-3">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-3">
            {FAQ_DATA.map((item, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-[#0c0c0c] pr-6 text-[15px] leading-snug">{item.q}</span>
                  <span className={`text-[#adf01b] text-2xl font-light flex-shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFAQ === i && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed text-[15px] border-t border-gray-50 pt-4">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0c0c0c] py-10 sm:py-16 px-5 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#adf01b]/12 to-transparent pointer-events-none"/>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Pronto para crescer com <span className="text-[#adf01b]">estratégia e dados reais?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Agende uma análise gratuita e descubra oportunidades reais para o seu negócio decolar com tráfego pago.
          </p>
          <a href={WA} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-3 bg-[#adf01b] hover:bg-[#c3ff3d] text-black px-10 py-5 rounded-full font-black text-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-lime-900/30">
            <IconWA className="w-6 h-6"/> Agendar análise gratuita →
          </a>
          <p className="text-gray-500 text-sm mt-6">Sem compromisso · Resposta rápida · Via WhatsApp</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#000000] py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Image src="/logos/insight-logo-green.png" alt="Insight" width={160} height={42} className="h-8 w-auto object-contain mb-4"/>
              <p className="text-gray-500 text-sm leading-relaxed">Agência de tráfego pago, produção de conteúdo e tecnologia.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Serviços</h4>
              <ul className="space-y-2">
                {['Instagram & Facebook Ads','Google Ads','Criativos de Ads','Consultoria em Tráfego'].map(s => (
                  <li key={s}><a href="#servicos" className="text-gray-500 hover:text-white text-sm transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Contato</h4>
              <div className="space-y-3">
                <a href={WA} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"><IconWA className="w-4 h-4"/> WhatsApp</a>
                {/* TODO: confirme o @ e o link reais do Instagram da Insight */}
                <a href="https://www.instagram.com/1sightmkt/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"><IconIG className="w-4 h-4"/> @1sightmkt</a>
                <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"><IconLI className="w-4 h-4"/> LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">© 2026 Insight. Todos os direitos reservados.</p>
            <p className="text-gray-600 text-sm">Dados protegidos pela LGPD.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
