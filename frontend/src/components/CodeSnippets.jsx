import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';

export const CodeSnippets = () => {
  const [activeSnippet, setActiveSnippet] = useState('odoo_sales_controller.py');
  const [copied, setCopied] = useState(false);

  const snippets = {
    'odoo_sales_controller.py': {
      lang: 'Python (Odoo ERP)',
      desc: 'Custom Python Odoo controller exposing REST API endpoint for real-time inventory and sales order synchronization.',
      code: `from odoo import http
from odoo.http import request
import json

class AgriLinkOdooController(http.Controller):

    @http.route('/api/odoo/sync_orders', type='json', auth='user', methods=['POST'], csrf=False)
    def sync_sales_orders(self, **kwargs):
        """Synchronize marketplace crop orders with Odoo Sales Module"""
        order_data = request.jsonrequest
        if not order_data or 'partner_id' not in order_data:
            return {'status': 'error', 'message': 'Invalid payload'}
        
        sale_order = request.env['sale.order'].sudo().create({
            'partner_id': order_data['partner_id'],
            'order_line': [(0, 0, {
                'product_id': line['product_id'],
                'product_uom_qty': line['qty'],
                'price_unit': line['price_unit']
            }) for line in order_data.get('lines', [])]
        })
        
        sale_order.action_confirm()
        return {
            'status': 'success',
            'order_id': sale_order.id,
            'name': sale_order.name,
            'total_amount': sale_order.amount_total
        }`
    },
    'express_auth_middleware.js': {
      lang: 'JavaScript (Node.js/Express)',
      desc: 'Centralized JWT / Secret Token authentication middleware ensuring secure API endpoint access.',
      code: `const { ADMIN_TOKEN } = require('../config/constants');

const verifyAdminSession = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Session Token Missing' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ success: false, error: 'Forbidden: Invalid Admin Token' });
  }

  req.adminUser = { role: 'Administrator', timestamp: new Date() };
  next();
};

module.exports = { verifyAdminSession };`
    },
    'use_portfolio.js': {
      lang: 'React (JavaScript)',
      desc: 'Custom React Context hook powering real-time profile, project state management, and backend synchronization.',
      code: `import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isBackendConnected, setIsBackendConnected] = useState(true);

  const fetchAllData = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) setProjects(await res.json());
    } catch (err) {
      setIsBackendConnected(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  return (
    <PortfolioContext.Provider value={{ projects, isBackendConnected, refreshData: fetchAllData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-snippets" className="py-24 relative z-10 section-glow-top bg-slate-950/40 backdrop-blur-sm border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Code2 className="w-3.5 h-3.5" />
            <span>PRODUCTION CODE SHOWCASE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Code <span className="text-gradient">Snippets & Design</span> Patterns
          </h2>
          <p className="text-slate-300 text-base">
            Clean, modular code samples demonstrating Odoo ERP Python module architecture, Express REST API middleware, and React hooks.
          </p>
        </div>

        {/* Code Snippets Viewer */}
        <div className="mt-14 max-w-5xl mx-auto glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Header Bar */}
          <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto">
              {Object.keys(snippets).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveSnippet(fileName)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeSnippet === fileName
                      ? 'bg-slate-800 text-cyan-300 font-bold border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fileName}
                </button>
              ))}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Description */}
          <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>{snippets[activeSnippet].desc}</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
              {snippets[activeSnippet].lang}
            </span>
          </div>

          {/* Code Window */}
          <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto bg-[#070b16] text-slate-200">
            <pre>
              <code>{snippets[activeSnippet].code}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};
