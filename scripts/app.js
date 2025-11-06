const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

// Mobile nav toggle
(() => {
  const btn = qs('.hamburger');
  const list = qs('.nav-list');
  if (!btn || !list) return;
  btn.addEventListener('click', () => {
    const open = list.style.display === 'flex';
    list.style.display = open ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', String(!open));
  });
})();

// Smooth scroll to contact
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = qs(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Back to top
(() => {
  const btn = qs('#backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 600;
    btn.classList.toggle('show', show);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Modal (demo and terms)
(() => {
  const openers = qsa('[data-open-modal]');
  console.log('🔵 Modal handler inicializado. Botões encontrados:', openers.length);

  openers.forEach(opener => {
    const id = opener.getAttribute('data-open-modal');
    console.log('🔵 Registrando botão para modal:', id);

    opener.addEventListener('click', () => {
      console.log('🟢 Botão clicado! Modal ID:', id);
      const modal = qs(`#modal-${id}`);
      console.log('🟢 Modal encontrado:', modal ? 'SIM' : 'NÃO');
      if (modal) {
        modal.classList.add('show');
        console.log('🟢 Modal aberto. Classes:', modal.classList.value);
      }
    });
  });

  qsa('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
        console.log('🔴 Modal fechado');
      }
    });
  });

  console.log('🔵 Modal handler configurado com sucesso');
})();

// Pricing toggle (monthly/yearly -20%)
(() => {
  const toggle = qs('#pricingToggle');
  if (!toggle) return;
  const cards = qsa('.pricing-card');
  const formatPrice = (n) => n.toLocaleString('pt-BR');
  const update = () => {
    const yearly = toggle.checked;
    cards.forEach(card => {
      const raw = card.getAttribute('data-price');
      const base = Number(raw);
      const valueEl = qs('.value', card);
      const periodEl = qs('.period', card);
      if (!valueEl || !periodEl) return;
      // Cartas sem preço numérico: manter "Sob consulta"
      if (!Number.isFinite(base)) {
        valueEl.textContent = 'Sob consulta';
        periodEl.textContent = '';
        return;
      }
      if (yearly) {
        const yearlyPrice = Math.round(base * 12 * 0.8);
        valueEl.textContent = formatPrice(yearlyPrice);
        periodEl.textContent = '/ano';
      } else {
        valueEl.textContent = formatPrice(base);
        periodEl.textContent = '/mês';
      }
    });
  };
  toggle.addEventListener('change', update);
  update();
})();

// Stats counters (on reveal)
(() => {
  const counters = qsa('.counter');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const dur = 1200;
        const start = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const val = target < 100 ? (target * p).toFixed(1) : Math.round(target * p);
          el.textContent = val;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => obs.observe(c));
})();

// Reveal on scroll
(() => {
  const revealEls = qsa('.card3d, .pricing-card, .testimonial, .section-title');
  revealEls.forEach(el => el.style.opacity = '0');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity .4s ease, transform .4s ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      } else {
        e.target.style.transform = 'translateY(8px)';
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => obs.observe(el));
})();

// Form validation + mailto integration
(() => {
  const form = qs('#leadForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = qs('#name').value.trim();
    const email = qs('#email').value.trim();
    const message = qs('#message').value.trim();
    const plan = qs('#plan_interest').value;
    if (name.length < 2) { alert('Informe um nome válido.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Informe um email válido.'); return; }
    if (message.length < 10) { alert('Mensagem muito curta.'); return; }
    const subject = encodeURIComponent(`Novo Lead - Landing Page - ${name} - ${plan}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nWhatsApp: ${qs('#phone').value}\nEmpresa: ${qs('#company').value}\nPlano: ${plan}\n\nMensagem:\n${message}`);
    const mailto = `mailto:contato@plataformawhatsapp.com.br?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
})();

// Button ripple effect
(() => {
  qsa('.ripple').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rip = document.createElement('span');
      rip.style.position = 'absolute';
      rip.style.left = `${x - 4}px`;
      rip.style.top = `${y - 4}px`;
      rip.style.width = '8px';
      rip.style.height = '8px';
      rip.style.borderRadius = '999px';
      rip.style.background = 'rgba(255,255,255,.5)';
      rip.style.transform = 'scale(0)';
      rip.style.opacity = '0.8';
      rip.style.transition = 'transform .6s ease, opacity .8s ease';
      btn.appendChild(rip);
      requestAnimationFrame(() => {
        rip.style.transform = 'scale(18)';
        rip.style.opacity = '0';
      });
      setTimeout(() => rip.remove(), 700);
    });
  });
})();

// Hero title typewriter with backspace and loop
(() => {
  const el = document.querySelector('.hero-title');
  if (!el) return;
  const phrases = [
    'Sua Empresa Conectada Como Nunca Antes',
    'Conecte. Inove. Cresça'
  ];
  const typingSpeed = 85; // slower typing
  const deletingSpeed = 55; // slower deleting
  const holdDelay = 1600; // longer hold
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeStep = () => {
    const current = phrases[phraseIndex];
    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        setTimeout(() => { deleting = true; scheduleNext(); }, holdDelay);
        return;
      }
    } else {
      el.textContent = current.slice(0, Math.max(0, charIndex - 1));
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    scheduleNext();
  };

  const scheduleNext = () => {
    const delay = deleting ? deletingSpeed : typingSpeed;
    setTimeout(typeStep, delay);
  };

  // Start from empty to avoid flash
  el.textContent = '';
  setTimeout(typeStep, 400);
})();

// Calculadora de custos: Meta vs Plataforma (BRL)
(() => {
  const msgEl = document.getElementById('calcMessages');
  const planSelectEl = document.getElementById('calcPlan');
  const ourRateDisplay = document.getElementById('calcOurRateDisplay');
  const metaRateDisplay = document.getElementById('calcMetaRateDisplay');
  const metaTotalEl = document.getElementById('calcMetaTotal');
  const ourTotalEl = document.getElementById('calcOurTotal');
  const diffEl = document.getElementById('calcDiff');
  const capacityNoteEl = document.getElementById('calcCapacity');
  if (!msgEl || !planSelectEl || !metaTotalEl || !ourTotalEl || !diffEl || !ourRateDisplay || !metaRateDisplay) return;

  const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const fmtRateOur = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  const fmtRateMeta = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // Meta (0,68) — exibição
  const metaFixed = 0.68;
  metaRateDisplay.textContent = `R$ ${fmtRateMeta.format(metaFixed)}`;

  // Planos: preço mensal e limite diário de mensagens
  const planDefs = {
    Starter: { price: 199, daily: 1000 },
    Professional: { price: 599, daily: 5000 },
    Business: { price: 1299, daily: 15000 },
    Enterprise: { price: 4999, daily: 50000 }
  };

  const update = () => {
    const messages = Number(msgEl.value) || 0;
    const metaRate = metaFixed;
    const planKey = planSelectEl.value;
    const plan = planDefs[planKey] || planDefs.Starter;
    const monthlyCap = plan.daily * 30; // capacidade mensal aproximada
    const effectiveOurRate = plan.price / monthlyCap; // taxa efetiva por mensagem
    ourRateDisplay.textContent = `R$ ${fmtRateOur.format(effectiveOurRate)}`;
    const metaTotal = messages * metaRate;
    const ourTotal = plan.price; // custo mensal fixo do plano
    metaTotalEl.textContent = fmt.format(metaTotal);
    ourTotalEl.textContent = fmt.format(ourTotal);
    const diff = Math.max(0, metaTotal - ourTotal);
    diffEl.textContent = fmt.format(diff);

    // Nota de capacidade conforme o plano selecionado
    if (capacityNoteEl) {
      if (!messages) {
        capacityNoteEl.textContent = 'Informe mensagens/mês para comparar.';
      } else if (messages > monthlyCap) {
        // Recomendar plano com capacidade suficiente
        const orderedKeys = ['Starter','Professional','Business','Enterprise'];
        const recommended = orderedKeys
          .map(k => ({ key: k, cap: planDefs[k].daily * 30, price: planDefs[k].price }))
          .find(p => messages <= p.cap);
        if (recommended) {
          capacityNoteEl.textContent = `Seu volume excede o limite mensal deste plano (~${monthlyCap.toLocaleString('pt-BR')} msgs). Recomendo: ${recommended.key} (${fmt.format(recommended.price)}/mês).`;
        } else {
          capacityNoteEl.textContent = 'Seu volume excede todos os planos. Consulte o plano Ultra.';
        }
      } else {
        capacityNoteEl.textContent = `Dentro do limite: até ${monthlyCap.toLocaleString('pt-BR')} msgs/mês no plano ${planKey}.`;
      }
    }
  };
  msgEl.addEventListener('input', update);
  planSelectEl.addEventListener('change', update);
  // Em alguns navegadores, o evento 'input' no select garante atualização imediata
  planSelectEl.addEventListener('input', update);
  // Inicializa com o plano selecionado por padrão
  update();
})();
// ==========================================
// TESTE GRÁTIS - WhatsApp Integration
// ==========================================

// NOTA: API_CONFIG está definido em config.js

// Função auxiliar para mostrar mensagens
function showFormMessage(message, type = 'info') {
  const messageEl = document.getElementById('formMessage');
  if (!messageEl) return;
  
  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;
  
  // Auto-hide após 5 segundos para mensagens de sucesso
  if (type === 'success') {
    setTimeout(() => {
      messageEl.className = 'form-message';
    }, 5000);
  }
}

// Função para formatar número no padrão internacional
function formatPhoneNumber(countryCode, phoneNumber) {
  // Remove espaços e caracteres especiais
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  // Retorna no formato: +5511987654321
  return `${countryCode}${cleanNumber}`;
}

// Função para verificar se o número existe no WhatsApp
async function checkWhatsAppNumber(phoneNumber) {
  const url = `${API_CONFIG.serverUrl}/chat/fetchProfile/${API_CONFIG.instance}`;
  
  const options = {
    method: 'POST',
    headers: {
      'apikey': API_CONFIG.apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      number: phoneNumber
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    // Verifica se a requisição foi bem-sucedida
    if (response.ok && data) {
      return { success: true, data };
    }
    
    return { success: false, error: 'Número não encontrado no WhatsApp' };
  } catch (error) {
    console.error('Erro ao verificar número:', error);
    return { success: false, error: error.message };
  }
}

// Função para enviar mensagem de teste
async function sendTestMessage(phoneNumber, message) {
  const url = `${API_CONFIG.serverUrl}/message/sendText/${API_CONFIG.instance}`;
  
  const options = {
    method: 'POST',
    headers: {
      'apikey': API_CONFIG.apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      number: phoneNumber,
      options: {
        delay: 1200,
        presence: 'composing',
        linkPreview: false
      },
      textMessage: {
        text: message
      }
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    }
    
    return { success: false, error: data.message || 'Erro ao enviar mensagem' };
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return { success: false, error: error.message };
  }
}

// Handler do formulário de teste grátis
(() => {
  const form = document.getElementById('testeGratisForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtém os valores do formulário
    const countryCode = document.getElementById('countryCode').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const message = document.getElementById('testMessage').value;
    const submitBtn = document.getElementById('sendTestBtn');

    // Validação básica
    if (!phoneNumber || phoneNumber.length < 8) {
      showFormMessage('Por favor, insira um número válido', 'error');
      return;
    }

    if (!message || message.trim().length < 10) {
      showFormMessage('A mensagem deve ter pelo menos 10 caracteres', 'error');
      return;
    }

    // Formata o número completo
    const fullNumber = formatPhoneNumber(countryCode, phoneNumber);

    // Desabilita o botão e mostra loading
    submitBtn.disabled = true;
    showFormMessage('Verificando número do WhatsApp...', 'info');

    // Etapa 1: Verifica se o número existe no WhatsApp
    const checkResult = await checkWhatsAppNumber(fullNumber);

    if (!checkResult.success) {
      submitBtn.disabled = false;
      showFormMessage(
        'Não foi possível verificar este número. Certifique-se de que ele está cadastrado no WhatsApp.',
        'error'
      );
      return;
    }

    // Etapa 2: Envia a mensagem de teste
    showFormMessage('Enviando mensagem de teste...', 'info');
    const sendResult = await sendTestMessage(fullNumber, message);

    if (sendResult.success) {
      showFormMessage(
        '✅ Mensagem enviada com sucesso! Confira seu WhatsApp.',
        'success'
      );
      // Limpa o formulário após 2 segundos
      setTimeout(() => {
        form.reset();
      }, 2000);
    } else {
      showFormMessage(
        `Erro ao enviar mensagem: ${sendResult.error}`,
        'error'
      );
    }

    // Reabilita o botão
    submitBtn.disabled = false;
  });
})();


// Video Modal Control - Play/Pause quando abrir/fechar
(() => {
  const demoModal = qs('#modal-demo');
  const demoVideo = qs('#demoVideo');
  
  if (!demoModal || !demoVideo) return;

  // Observa mudanças na classe do modal
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isOpen = demoModal.classList.contains('show');
        
        if (isOpen) {
          // Modal aberto: toca o vídeo
          console.log('🎬 Modal de demo aberto - iniciando vídeo');
          demoVideo.play().catch(err => {
            console.log('Autoplay bloqueado pelo navegador:', err);
          });
        } else {
          // Modal fechado: pausa o vídeo
          console.log('⏸️ Modal de demo fechado - pausando vídeo');
          demoVideo.pause();
          demoVideo.currentTime = 0; // Volta para o início
        }
      }
    });
  });

  observer.observe(demoModal, { attributes: true });
  
  console.log('🎬 Controle de vídeo inicializado');
})();
