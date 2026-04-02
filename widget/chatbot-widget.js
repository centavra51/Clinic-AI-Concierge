(function () {
    const scriptConfig = document.currentScript?.dataset || {};
    const rootConfig = document.body?.dataset || {};
    const CONFIG = {
        webhookUrl: scriptConfig.webhookUrl || rootConfig.webhookUrl || 'https://auto.amz-creator.com/webhook/dental-ai',
        clinicId: scriptConfig.clinicId || rootConfig.clinicId || 'b8330321-a63c-4da1-b0b8-06cc0b48e438',
        primaryColor: scriptConfig.primaryColor || '#111827',
        secondaryColor: scriptConfig.secondaryColor || '#374151',
        textColor: scriptConfig.textColor || '#ffffff',
        translations: {
            en: {
                botName: 'SmileCare AI',
                welcomeMessage: 'Hello! I am your SmileCare AI assistant. How can I help you today?',
                placeholder: 'Type a message...',
                inviteText: 'AI assistant online. Ask me anything.',
                checkingSlots: 'Checking availability for {doctor}...',
                slotsTitle: 'Available time for {doctor} on {date}:',
                slotsError: 'Could not load available slots for {doctor}. Please try again.',
                contactPrompt: 'Selected slot {slot} with {doctor}. Send your name and phone in one message, for example: Anna Ivanova, +37369123456',
                contactRetry: 'Please send both name and phone in one message, for example: Anna Ivanova, +37369123456',
                bookingProgress: 'Booking your visit with {doctor} at {time}...',
                bookingSuccess: 'Done. Your appointment with {doctor} is booked for {date} at {time}.',
                bookingError: 'Could not complete the booking. Please try selecting the slot again.',
                connectionError: 'Connection error. Please try again in a moment.',
                lostState: 'The selected doctor or slot was lost. Please choose the doctor again.'
            },
            ru: {
                botName: '\u0421\u043c\u0430\u0439\u043b\u041a\u0435\u0440 AI',
                welcomeMessage: '\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u042f \u0432\u0430\u0448 AI-\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442 \u043a\u043b\u0438\u043d\u0438\u043a\u0438 SmileCare. \u0427\u0435\u043c \u043c\u043e\u0433\u0443 \u043f\u043e\u043c\u043e\u0447\u044c?',
                placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435...',
                inviteText: 'AI-\u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u043d\u0442 \u043e\u043d\u043b\u0430\u0439\u043d. \u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043e\u043f\u0440\u043e\u0441.',
                checkingSlots: '\u041f\u0440\u043e\u0432\u0435\u0440\u044f\u044e \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u0434\u043b\u044f {doctor}...',
                slotsTitle: '\u0421\u0432\u043e\u0431\u043e\u0434\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u0434\u043b\u044f {doctor} \u043d\u0430 {date}:',
                slotsError: '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u043b\u043e\u0442\u044b \u0434\u043b\u044f {doctor}. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.',
                contactPrompt: '\u0412\u044b\u0431\u0440\u0430\u043d \u0441\u043b\u043e\u0442 {slot} \u0443 {doctor}. \u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0438\u043c\u044f \u0438 \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u043e\u0434\u043d\u0438\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435\u043c, \u043d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: \u0410\u043d\u043d\u0430 \u0418\u0432\u0430\u043d\u043e\u0432\u0430, +37369123456',
                contactRetry: '\u041d\u0443\u0436\u043d\u043e \u0438\u043c\u044f \u0438 \u0442\u0435\u043b\u0435\u0444\u043e\u043d. \u041f\u0440\u0438\u0448\u043b\u0438\u0442\u0435 \u043e\u0434\u043d\u0438\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435\u043c, \u043d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: \u0410\u043d\u043d\u0430 \u0418\u0432\u0430\u043d\u043e\u0432\u0430, +37369123456',
                bookingProgress: '\u041e\u0444\u043e\u0440\u043c\u043b\u044f\u044e \u0437\u0430\u043f\u0438\u0441\u044c \u043a {doctor} \u043d\u0430 {time}...',
                bookingSuccess: '\u0413\u043e\u0442\u043e\u0432\u043e. \u0412\u0430\u0441 \u0437\u0430\u043f\u0438\u0441\u0430\u043b\u0438 \u043a {doctor} \u043d\u0430 {date} \u0432 {time}.',
                bookingError: '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c \u0437\u0430\u043f\u0438\u0441\u044c. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0441\u043b\u043e\u0442 \u0435\u0449\u0451 \u0440\u0430\u0437.',
                connectionError: '\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0432\u044f\u0437\u0438 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043e\u043c. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0447\u0443\u0442\u044c \u043f\u043e\u0437\u0436\u0435.',
                lostState: '\u0412\u044b\u0431\u043e\u0440 \u0432\u0440\u0430\u0447\u0430 \u0438\u043b\u0438 \u0441\u043b\u043e\u0442\u0430 \u0441\u0431\u0438\u043b\u0441\u044f. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0430\u0447\u0430 \u0435\u0449\u0451 \u0440\u0430\u0437.'
            },
            ro: {
                botName: 'SmileCare AI',
                welcomeMessage: 'Buna! Sunt asistentul AI SmileCare. Cu ce va pot ajuta astazi?',
                placeholder: 'Scrieti un mesaj...',
                inviteText: 'Consultant AI online. Intrebati orice.',
                checkingSlots: 'Verific disponibilitatea pentru {doctor}...',
                slotsTitle: 'Ore disponibile pentru {doctor} in data de {date}:',
                slotsError: 'Nu am putut incarca intervalele pentru {doctor}. Incercati din nou.',
                contactPrompt: 'Ati ales intervalul {slot} cu {doctor}. Trimiteti numele si telefonul intr-un singur mesaj, de exemplu: Ana Ivanova, +37369123456',
                contactRetry: 'Am nevoie de nume si telefon intr-un singur mesaj, de exemplu: Ana Ivanova, +37369123456',
                bookingProgress: 'Finalizez programarea la {doctor} pentru ora {time}...',
                bookingSuccess: 'Gata. Programarea la {doctor} este confirmata pentru {date} la ora {time}.',
                bookingError: 'Nu am putut finaliza programarea. Incercati sa alegeti din nou intervalul.',
                connectionError: 'Eroare de conexiune. Incercati din nou in cateva momente.',
                lostState: 'Alegerea medicului sau a intervalului s-a pierdut. Alegeti din nou medicul.'
            }
        }
    };

    const getLang = () => {
        const htmlLang = document.documentElement.lang?.split('-')[0]?.toLowerCase();
        if (htmlLang && CONFIG.translations[htmlLang]) return htmlLang;
        const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
        if (browserLang && CONFIG.translations[browserLang]) return browserLang;
        return 'ru';
    };

    let lang = getLang();
    let text = CONFIG.translations[lang];

    const format = (template, vars = {}) => template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));

    const host = document.createElement('div');
    host.id = 'ai-chatbot-widget-container';
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
:host {
    --pg: linear-gradient(135deg, ${CONFIG.primaryColor}, ${CONFIG.secondaryColor});
    --panel: #ffffff;
    --ink: #1f2937;
    --muted: #6b7280;
    --line: #e5e7eb;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
* { box-sizing: border-box; }
.chat-trigger-area {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
}
.invite-bubble {
    max-width: 260px;
    padding: 14px 20px;
    border-radius: 24px 24px 8px 24px;
    background: rgba(255,255,255,0.96);
    border: 1px solid var(--line);
    box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    color: #111827;
    font-size: 0.95rem;
    font-weight: 700;
}
.robot-container {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #000;
    display: grid;
    place-items: center;
    box-shadow: 0 15px 30px rgba(0,0,0,0.28);
    transition: transform 0.25s ease;
}
.robot-container:hover { transform: translateY(-3px) scale(1.04); }
.robot-svg { width: 40px; height: 40px; fill: #fff; }
.chat-window {
    position: fixed;
    right: 2rem;
    bottom: 6.5rem;
    z-index: 10000;
    width: min(520px, 90vw);
    height: min(720px, 85vh);
    background: #fff;
    border-radius: 32px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    transform: translateY(28px) scale(0.96);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
}
.chat-window.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
}
.chat-header {
    background: #000;
    color: #fff;
    padding: 22px 24px;
    font-weight: 700;
    border-bottom: 1px solid rgba(255,255,255,0.08);
}
.chat-msgs {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    background: #fcfcfd;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.msg {
    max-width: 88%;
    padding: 14px 18px;
    border-radius: 20px;
    line-height: 1.6;
    font-size: 0.98rem;
    word-break: break-word;
}
.msg.bot {
    align-self: flex-start;
    background: #fff;
    color: var(--ink);
    border: 1px solid #f1f1f1;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.msg.user {
    align-self: flex-end;
    background: #000;
    color: #fff;
}
.extra-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 10px;
    width: 100%;
}
.dr-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 20px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
}
.dr-card:hover {
    transform: translateY(-2px);
    border-color: rgba(0,0,0,0.08);
    box-shadow: 0 10px 22px rgba(0,0,0,0.08);
}
.dr-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    background: #eee;
}
.dr-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.dr-name {
    font-weight: 700;
    font-size: 1.03rem;
}
.dr-spec {
    font-size: 0.88rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
}
.slot-btn {
    padding: 10px 12px;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 12px;
    text-align: center;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.slot-btn:hover {
    transform: translateY(-1px);
    background: #000;
    color: #fff;
    border-color: #000;
}
.chat-input-area {
    display: flex;
    gap: 12px;
    padding: 20px 24px;
    background: #fff;
    border-top: 1px solid #f1f1f1;
}
.ci {
    flex: 1;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 14px 18px;
    background: #f9fafb;
    outline: none;
    font-size: 1rem;
}
.ci:focus {
    background: #fff;
    border-color: #000;
}
.sb {
    width: 52px;
    height: 52px;
    border: 0;
    border-radius: 16px;
    cursor: pointer;
    background: #000;
    color: #fff;
    display: grid;
    place-items: center;
}
@media (max-width: 560px) {
    .chat-trigger-area {
        right: 1rem;
        bottom: 1rem;
        gap: 10px;
    }
    .chat-window {
        right: 1rem;
        left: 1rem;
        width: auto;
        height: min(78vh, 640px);
        bottom: 5.8rem;
        border-radius: 24px;
    }
    .invite-bubble {
        max-width: 210px;
        font-size: 0.88rem;
    }
}
`;
    shadow.appendChild(style);

    const shell = document.createElement('div');
    shell.innerHTML = `
<div class="chat-trigger-area" id="ct">
    <div class="invite-bubble" id="invite-bubble"></div>
    <div class="robot-container">
        <svg class="robot-svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill-opacity="0.3"/><circle cx="12" cy="10" r="2"/><circle cx="8" cy="14" r="1.5"/><circle cx="16" cy="14" r="1.5"/><path d="M12 12l-4 2M12 12l4 2M12 8V5M11 5h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
    </div>
</div>
<div class="chat-window" id="cw">
    <div class="chat-header" id="chat-title"></div>
    <div class="chat-msgs" id="cm"></div>
    <div class="chat-input-area">
        <input type="text" class="ci" id="ci">
        <button class="sb" id="sb" aria-label="Send">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
    </div>
</div>`;
    shadow.appendChild(shell);

    const ct = shadow.getElementById('ct');
    const cw = shadow.getElementById('cw');
    const cm = shadow.getElementById('cm');
    const ci = shadow.getElementById('ci');
    const sb = shadow.getElementById('sb');
    const inviteBubble = shadow.getElementById('invite-bubble');
    const chatTitle = shadow.getElementById('chat-title');

    let isOpen = false;
    const sid = localStorage.getItem('cwsid') || ('s-' + Date.now());
    localStorage.setItem('cwsid', sid);

    const bookingState = {
        doctor: null,
        slot: null,
        awaitingContact: false
    };

    const applyText = () => {
        inviteBubble.textContent = text.inviteText;
        chatTitle.textContent = text.botName;
        ci.placeholder = text.placeholder;
        if (!cm.childElementCount) {
            appendMessage(text.welcomeMessage, 'bot');
        } else if (cm.firstElementChild?.dataset?.welcome === 'true') {
            cm.firstElementChild.textContent = text.welcomeMessage;
        }
    };

    const clearInteractiveSuggestions = () => {
        cm.querySelectorAll('.extra-content').forEach((node) => node.remove());
    };

    const resetBookingState = () => {
        bookingState.doctor = null;
        bookingState.slot = null;
        bookingState.awaitingContact = false;
    };

    const extractContactInfo = (message) => {
        const source = String(message || '').trim();
        if (!source) return null;

        const phoneMatch = source.match(/(?:\+?\d[\d\s\-()]{7,}\d)/);
        const phone = phoneMatch ? phoneMatch[0].replace(/\s+/g, ' ').trim() : '';

        let name = '';
        const labeledName = source.match(/(?:^|\n|\s)(?:name|patient|имя|пациент)\s*[:\-]\s*([^\n,]+)/i);
        if (labeledName) {
            name = labeledName[1].trim();
        } else if (phoneMatch) {
            name = source.replace(phoneMatch[0], ' ').replace(/[,\n]+/g, ' ').trim();
        }

        name = name.replace(/^(?:name|patient|имя|пациент)\s*[:\-]\s*/i, '').trim();
        return name && phone ? { name, phone } : null;
    };

    const fetchJson = async (payload) => {
        const res = await fetch(CONFIG.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Request failed');
        }
        return data;
    };

    const createDoctorCard = (doctor) => {
        const card = document.createElement('div');
        card.className = 'dr-card';

        const avatar = document.createElement('img');
        avatar.className = 'dr-avatar';
        avatar.src = doctor.avatar_url || 'https://via.placeholder.com/60';
        avatar.alt = doctor.full_name || 'Doctor';

        const info = document.createElement('div');
        info.className = 'dr-info';

        const name = document.createElement('div');
        name.className = 'dr-name';
        name.textContent = doctor.full_name || '';

        const specialty = document.createElement('div');
        specialty.className = 'dr-spec';
        specialty.textContent = doctor.specialty || '';

        info.appendChild(name);
        info.appendChild(specialty);
        card.appendChild(avatar);
        card.appendChild(info);

        card.onclick = () => {
            clearInteractiveSuggestions();
            appendDoctorAvailability(doctor);
        };

        return card;
    };

    const createSlotButton = (slot) => {
        const btn = document.createElement('div');
        btn.className = 'slot-btn';
        const slotLabel = String(slot.label || slot.time || '').replace(/\s*-\s*Available$/i, '').trim();
        btn.textContent = slotLabel;
        btn.onclick = () => {
            clearInteractiveSuggestions();
            bookingState.slot = slot;
            bookingState.awaitingContact = true;
            appendMessage(slotLabel, 'user');
            appendMessage(format(text.contactPrompt, {
                slot: slotLabel,
                doctor: bookingState.doctor?.full_name || ''
            }), 'bot');
        };
        return btn;
    };

    const appendMessage = (content, sender) => {
        const wrap = document.createElement('div');
        wrap.className = `msg ${sender}`;

        let data = null;
        if (sender === 'bot' && typeof content === 'object' && content) {
            data = content;
        } else if (sender === 'bot' && typeof content === 'string') {
            try {
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) data = JSON.parse(jsonMatch[0]);
            } catch {}
        }

        if (data && data.message) {
            wrap.textContent = data.message;
        } else {
            wrap.textContent = String(content ?? '');
        }

        if (!cm.childElementCount && sender === 'bot') {
            wrap.dataset.welcome = 'true';
        }

        cm.appendChild(wrap);

        if (data && ((Array.isArray(data.suggestedDoctors) && data.suggestedDoctors.length) || (Array.isArray(data.suggestedSlots) && data.suggestedSlots.length))) {
            const extra = document.createElement('div');
            extra.className = 'extra-content';

            if (Array.isArray(data.suggestedDoctors)) {
                data.suggestedDoctors.forEach((doctor) => extra.appendChild(createDoctorCard(doctor)));
            }

            if (Array.isArray(data.suggestedSlots) && data.suggestedSlots.length) {
                const grid = document.createElement('div');
                grid.className = 'slots-grid';
                data.suggestedSlots.forEach((slot) => grid.appendChild(createSlotButton(slot)));
                extra.appendChild(grid);
            }

            cm.appendChild(extra);
        }

        cm.scrollTop = cm.scrollHeight;
    };

    const appendDoctorAvailability = async (doctor) => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 1);
        const date = targetDate.toISOString().slice(0, 10);

        bookingState.doctor = doctor;
        bookingState.slot = null;
        bookingState.awaitingContact = false;

        appendMessage(format(text.checkingSlots, { doctor: doctor.full_name || '' }), 'bot');

        try {
            const data = await fetchJson({
                action: 'get_slots',
                clinic_id: CONFIG.clinicId,
                doctor_id: doctor.id,
                date
            });

            appendMessage({
                message: format(text.slotsTitle, { doctor: doctor.full_name || '', date }),
                suggestedDoctors: [],
                suggestedSlots: Array.isArray(data.available_slots) ? data.available_slots : []
            }, 'bot');
        } catch {
            appendMessage(format(text.slotsError, { doctor: doctor.full_name || '' }), 'bot');
        }
    };

    const submitChatBooking = async (contact) => {
        const doctor = bookingState.doctor;
        const slot = bookingState.slot;

        if (!doctor || !slot) {
            resetBookingState();
            appendMessage(text.lostState, 'bot');
            return;
        }

        const bookingDate = slot.start ? String(slot.start).slice(0, 10) : '';
        const bookingTime = slot.time || '';
        appendMessage(format(text.bookingProgress, { doctor: doctor.full_name || '', time: bookingTime }), 'bot');

        try {
            const response = await fetchJson({
                action: 'book_appointment',
                clinic_id: CONFIG.clinicId,
                doctor_id: doctor.id,
                date: bookingDate,
                time: bookingTime,
                patient_name: contact.name,
                patient_phone: contact.phone,
                source: 'chat_widget'
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            appendMessage(format(text.bookingSuccess, {
                doctor: doctor.full_name || '',
                date: bookingDate,
                time: bookingTime
            }), 'bot');
            resetBookingState();
        } catch {
            appendMessage(text.bookingError, 'bot');
        }
    };

    const sendMessage = async () => {
        const message = ci.value.trim();
        if (!message) return;

        ci.value = '';
        appendMessage(message, 'user');

        if (bookingState.awaitingContact && bookingState.doctor && bookingState.slot) {
            const contact = extractContactInfo(message);
            if (!contact) {
                appendMessage(text.contactRetry, 'bot');
                return;
            }
            await submitChatBooking(contact);
            return;
        }

        try {
            const json = await fetchJson({
                action: 'ai_chat',
                clinic_id: CONFIG.clinicId,
                message,
                sessionId: sid
            });
            appendMessage(json.data || json, 'bot');
        } catch {
            appendMessage(text.connectionError, 'bot');
        }
    };

    ct.onclick = () => {
        isOpen = !isOpen;
        cw.classList.toggle('open', isOpen);
        if (isOpen) ci.focus();
    };

    document.addEventListener('click', (event) => {
        if (!isOpen) return;
        const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
        const clickedInsideWidget = path.includes(host);
        if (!clickedInsideWidget) {
            isOpen = false;
            cw.classList.remove('open');
        }
    });

    sb.onclick = sendMessage;
    ci.onkeypress = (event) => {
        if (event.key === 'Enter') sendMessage();
    };

    applyText();

    const observer = new MutationObserver(() => {
        const nextLang = getLang();
        if (nextLang === lang) return;
        lang = nextLang;
        text = CONFIG.translations[lang];
        applyText();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });
})();
