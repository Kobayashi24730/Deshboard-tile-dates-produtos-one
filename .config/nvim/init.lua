-- =========================
-- LEADER
-- =========================
vim.g.mapleader = " "

-- =========================
-- BOOTSTRAP LAZY
-- =========================
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git","clone","--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", lazypath
  })
end
vim.opt.rtp:prepend(lazypath)

-- =========================
-- PLUGINS
-- =========================
require("lazy").setup({

  -- Theme
  { "catppuccin/nvim", name = "catppuccin", priority = 1000 },

  -- LSP
  { "neovim/nvim-lspconfig" },

  {
    "nvim-telescope/telescope-fzf-native.nvim",
    build = "make"
  },

  {
    "stevearc/conform.nvim",
    config = function()
      require("conform").setup({
        formatters_by_ft = {
          python = { "black" },
          javascript = { "prettier" },
          typescript = { "prettier" },
          javascriptreact = { "prettier" },
          typescriptreact = { "prettier" },
          html = { "prettier" },
          css = { "prettier" },
          php = { "pint" }
        }
      })
    end
  },

  { "mfussenegger/nvim-dap" },

  {
    "windwp/nvim-ts-autotag",
    config = function()
      require("nvim-ts-autotag").setup()
    end
  },

  {
    "windwp/nvim-autopairs",
    event = "InsertEnter",
    config = function()
      require("nvim-autopairs").setup({})
    end
  },

  { "onsails/lspkind.nvim" },

  -- Treesitter
  {
    "nvim-treesitter/nvim-treesitter",
    build = function()
      vim.cmd("TSUpdate")
    end,
    config = function()
      local ok, ts_configs = pcall(require, "nvim-treesitter.configs")
      if not ok then return end
      ts_configs.setup({
        ensure_installed = { "javascript","typescript","tsx","html","css","json","lua","python" },
        highlight = { enable = true },
      })
    end
  },

  -- Trouble
  {
    "folke/trouble.nvim",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    config = function()
      local ok, trouble = pcall(require, "trouble")
      if not ok then return end
      trouble.setup()
      vim.keymap.set("n", "<leader>xx", "<cmd>TroubleToggle<cr>")
    end
  },

  -- Mason
  { "williamboman/mason.nvim" },
  { "williamboman/mason-lspconfig.nvim" },
  { "nvim-tree/nvim-web-devicons" },

  -- Autocomplete
  { "hrsh7th/nvim-cmp" },
  { "hrsh7th/cmp-nvim-lsp" },
  { "hrsh7th/cmp-buffer" },
  { "hrsh7th/cmp-path" },
  { "nvim-lua/plenary.nvim" },
  { "L3MON4D3/LuaSnip" },
  { "saadparwaiz1/cmp_luasnip" },

  -- Explorer
  { "nvim-tree/nvim-tree.lua" },

  -- Finder
  { "nvim-telescope/telescope.nvim", dependencies = { "nvim-lua/plenary.nvim" } },

  -- Statusline
  { "nvim-lualine/lualine.nvim" },

})

-- =========================
-- BASIC CONFIG
-- =========================
vim.o.number = true
vim.o.relativenumber = true
vim.o.termguicolors = true
vim.o.expandtab = true
vim.o.shiftwidth = 2
vim.o.tabstop = 2
vim.o.completeopt = "menu,menuone,noselect"

-- =========================
-- THEME
-- =========================
vim.cmd.colorscheme "catppuccin"

-- =========================
-- NVIM TREE
-- =========================
local ok, nvim_tree = pcall(require, "nvim-tree")
if ok then
  nvim_tree.setup()
  vim.keymap.set("n","<leader>e",":NvimTreeToggle<CR>")
end

-- =========================
-- TELESCOPE
-- =========================
local ok, telescope_builtin = pcall(require, "telescope.builtin")
if ok then
  vim.keymap.set("n","<leader>f", telescope_builtin.find_files)
  vim.keymap.set("n","<leader>g", telescope_builtin.live_grep)
end

-- =========================
-- LUALINE
-- =========================
local ok, lualine = pcall(require, "lualine")
if ok then
  lualine.setup()
end

-- =========================
-- AUTOCOMPLETE
-- =========================
local ok, cmp = pcall(require, "cmp")
if ok then
  local luasnip = require("luasnip")
  cmp.setup({
    formatting = {
      format = require("lspkind").cmp_format({
        mode = "symbol_text",
        maxwidth = 50,
      })
    },

    snippet = {
      expand = function(args)
        luasnip.lsp_expand(args.body)
      end,
    },
    mapping = cmp.mapping.preset.insert({
      ["<Tab>"] = cmp.mapping.select_next_item(),
      ["<S-Tab>"] = cmp.mapping.select_prev_item(),
      ["<CR>"] = cmp.mapping.confirm({ select = true }),
      ["<C-Space>"] = cmp.mapping.complete(),
    }),
    sources = {
      { name = "nvim_lsp" },
      { name = "buffer" },
      { name = "path" },
    },
  })
end

-- =========================
-- LSP + MASON
-- =========================
pcall(function()
  local mason = require("mason")
  local mason_lsp = require("mason-lspconfig")
  local lspconfig = require("lspconfig")
  local capabilities = require("cmp_nvim_lsp").default_capabilities()

  mason.setup()
  mason_lsp.setup({
    ensure_installed = { "pyright","ts_ls","html","cssls","jsonls","clangd" }
  })

  mason_lsp.setup_handlers({
    function(server_name)
      lspconfig[server_name].setup({ capabilities = capabilities })
    end
  })
end)

-- =========================
-- LSP KEYMAPS
-- =========================
vim.api.nvim_create_autocmd("LspAttach", {
  callback = function(ev)
    local opts = { buffer = ev.buf }
    vim.keymap.set("n","gd", vim.lsp.buf.definition, opts)
    vim.keymap.set("n","K", vim.lsp.buf.hover, opts)
    vim.keymap.set("n","gr", vim.lsp.buf.references, opts)
    vim.keymap.set("n","<leader>rn", vim.lsp.buf.rename, opts)
    vim.keymap.set("n","<leader>ca", vim.lsp.buf.code_action, opts)
    vim.keymap.set("n","<leader>ff", function()
      vim.lsp.buf.format({async=true})
    end, opts)
  end
})

-- =========================
-- DIAGNOSTICS
-- =========================
vim.diagnostic.config({
  virtual_text = true,
  signs = true,
  underline = true,
  update_in_insert = true,
  severity_sort = true,
})

vim.fn.sign_define("DiagnosticSignError", { text = "", texthl = "DiagnosticSignError" })
vim.fn.sign_define("DiagnosticSignWarn", { text = "", texthl = "DiagnosticSignWarn" })
vim.fn.sign_define("DiagnosticSignInfo", { text = "", texthl = "DiagnosticSignInfo" })
vim.fn.sign_define("DiagnosticSignHint", { text = "󰌵", texthl = "DiagnosticSignHint" })
